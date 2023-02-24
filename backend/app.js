import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import client from './pgClient.js'
import cors from "cors";
import {fileURLToPath} from 'url';

// import rosterMock from './mockData/rosterExample.json' assert { type: "json" };
// import surveyMock  from './mockData/surveyExample.json' assert { type: "json" };

// const express = require('express')
// const path = require('path')
// const dotenv = require('dotenv')
// const client = require('./pgClient.js')
// const cors = require('cors')

//Setting up env variables
dotenv.config({path:"./.env"})

// Create the server
const app = express()
app.use(express.json())
app.use(cors())

await client.connect()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

//Route for Next Button
app.get('/checkId', async (req, res) => {
  const id = req.query.id

  try {
    //Query database for a buId matching the database.
    const item = await client.query(
        "SELECT * FROM Students LEFT JOIN Surveys ON Students.StudentId = Surveys.StudentId WHERE Students.StudentId=$1;", [id]
    );

    const results = item.rows

    //Check if there is a match. If there is a match
    if (results.length > 0) {
      //Check if student has already a true flag, return separate error message
      //Note:.surveydate is a Date. see how it interacts with boolean
      if (results[0].surveydate) {
        return res.status(201).send('Survey already filled')
      }
      //If flag is false and there is a match, return 200 signaling good to go

      return res.status(200).send(JSON.stringify({"firstName": results[0].studentfirst, "lastName": results[0].studentlast, "middleName": results[0].studentmiddle, "buId": id }))
    }
    else {
      //If there are no results found, invalid BU id.
      return res.status(202).send('id not found')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }
})

app.post('/formSubmission', async (req, res) => {
  const data = req.body; //JSON of object to insert

  try {
    await client.query(
        "INSERT INTO SURVEYS (StudentId, Organization, Responsibilities, Country, State, TimezoneFromUTC, Coding, Requirements, Testing, UIDesign, ProjectManager, SurveyDate) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",[data.StudentId, data.Organization, data.Responsibilities, data.Country, data.State, data.TimezoneFromUTC, data.Coding, data.Requirements, data.Testing, data.UIDesign, data.ProjectManager, new Date().toLocaleDateString()]
    );

  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  } finally {
    res.status(200).send("Added survey to database")
  }

});

//Helper Function to find index of all max values
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
const CODING_MINIMUM = 50;

function findNearestValue(arr, val) {
  return arr.reduce(function(prev, curr) {
    return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev;
  }, Infinity);
}

app.get('/generateTeams', async (req, res) => {
  let csvRows2;

  //pull roster + survey and mash them into one table.
  const softwareDevMajor = []
  const noSurveyStudents = []
  let totalStudents
  const softwareExperience = [] //currently combined with softwareDev
  // 0 = Coder, 1 = Requirements, 2 = Tester, 3 = UI, 4 = PM
  const role = {
    "1": {

    },
    "2": {

    },
    "3": {

    },
    "4": {

    }
  }

  //Function needs to accept the whole role array not just one timezone

  function popStudent(fullRoleObject, specificRole, optimalTimezone) {


    //Loop through the roleArray for a valid student, if invalid we pop it immediately and continue looking. Once valid we break out of this loop.
    let student = fullRoleObject[specificRole][optimalTimezone][0]; // removes the first element from the array

    Object.keys(fullRoleObject).forEach((role) => {
      if (!fullRoleObject[role][optimalTimezone]){return}
      fullRoleObject[role][optimalTimezone] = fullRoleObject[role][optimalTimezone].filter((s) => s.studentid !== student.studentid)

      if (!fullRoleObject[role][optimalTimezone].length) {
        delete fullRoleObject[role][optimalTimezone]
      }
    })

    return student
  }

  try {
    const item = await client.query(
        "SELECT Students.StudentId, StudentName, email, pgm, concentration1, concentration2, organization, Responsibilities, state, timezonefromutc, coding, requirements, testing, uidesign, projectmanager, surveydate FROM STUDENTS LEFT JOIN SURVEYS ON Students.StudentId = Surveys.StudentId ORDER BY Surveys.TimezoneFromUTC ASC;"
    );

    //This is the result
    const results = item.rows

    let csv2data = item.rows.map((student) => Object.values(student).map((value)=> `"${JSON.stringify(value).replace(/"/g, "")}"`).join(','))
    csv2data.unshift(Object.keys(item.rows[0]).join(',')) //headers
    csvRows2 = csv2data.join('\n')



    totalStudents = item.rows.length
    const targetNumberOfGroups = Math.floor(totalStudents/5)

    //Organize each student into their strongest role
    results.map((student) => {
      //Add student to global student array
      //If a students major is software development, push them into software team else find their strength
      if (student.concentration1 === 'Software Development' && softwareDevMajor.length < targetNumberOfGroups) {
        softwareDevMajor.push(student)
      } else if (!student.surveydate) { //If the student didn't fill out the survey, put them in their own category
        noSurveyStudents.push(student)
      }
      else {
        //If the student is not a Software Dev Major, Find their strengths.
        //Array of their strength numbers
        let strengths = [Number(-Infinity), Number(student.uidesign), Number(student.testing), Number(student.requirements), Number(student.projectmanager)]

        //Finding their most confident skill where ties can be possible
        let greatestStrengthNumber = Math.max(...strengths)
        let mostConfidentSkills = indexOfAll(strengths, greatestStrengthNumber)

        // //Check if their main strength is coding, if it is make sure they are at least half sure of themselves. Add to the coderArray if both conditions are true
        if ((student.coding >= greatestStrengthNumber)  && student.coding >= CODING_MINIMUM && softwareDevMajor.length < targetNumberOfGroups) {
          softwareDevMajor.push(student)
        } else {
          //After this forEach, role will be a dictionary object holding each student's role and their timezone.
            mostConfidentSkills.forEach(value => {
              if (value) { //if 0 which means coding role it skips, since we already took into account this case
                //Get students timezone
                const timezone = student.timezonefromutc
                //if there is already a timezone established then add the student to that timezone
                if (role[value][timezone]) {
                  role[value][timezone] = [...role[value][timezone], ...[student]]
                } else {
                  //If this is the first student in the timezone, start the timezone
                  role[value][timezone] = [student]
                }
              }
            })
        }
      }
    })

  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }

    const arrayOfGroups = softwareDevMajor.map((currentCoder) => {
      //Get the optimal timezone for the group based around coder
      let coderTimezone = currentCoder.timezonefromutc

      //For each role, pick a person
      return  ["1", "2", "3", "4"].map((assignRole) => {

        //This is the object with timezones
        let uiDesignerObject = role[assignRole]
        //Timezone array for this role
        let timezoneArray = Object.keys(uiDesignerObject).map((timezone) => Number(timezone))//gives an array of the timezone in int

        //Find closest timezone with people in it
        const timezone = findNearestValue(timezoneArray, coderTimezone);

        //Preliminary pop, if timezone is Infinity this means that there are no students available of that role. Fill in with students without surveys.
        let uiDesigner = timezone === Infinity ? noSurveyStudents.shift() : popStudent(role, assignRole, timezone)

        // If there are no longer any students without surveys, uiDesigner will be undefined.
        // If uiDesigner is undefined
        if (!uiDesigner) {
          //Find the next best timezone + role available
          //This returns a single object with a role + timezone available

          //FlatMap flattens the array of the timezone role objects [{timezone: int , role: ""}, {for each role} ] and then reduce finds the nearest timezone
          let bestTimezoneRole = Object.keys(role).flatMap((specificRole) => Object.keys(role[specificRole]).map((timezone) => ({
            timezone: Number(timezone),
            role: specificRole
          }))).reduce(function (prev, curr) {
            return Math.abs(curr.timezone - coderTimezone) < Math.abs(prev.timezone - coderTimezone) ? curr : prev;
          }, {timezone: Infinity});


          //If bestTimeZoneRole is Infinity it means we're literally out of people.  Else we found a person, assign her.
          if (bestTimezoneRole.timezone !== Infinity) {
            uiDesigner = popStudent(role, bestTimezoneRole.role, bestTimezoneRole.timezone)
          }
        }

        //Return her
        return uiDesigner
      }).filter(x => x).concat([currentCoder]) //Check for falsy values
    }).sort((g1,g2) => {
      let score1 = g1.flatMap((student) => [Number(student.coding), Number(student.uidesign), Number(student.testing), Number(student.requirements), Number(student.projectmanager)]).reduce((sum, val) => sum + val, 0)
      let score2 = g2.flatMap((student) => [Number(student.coding), Number(student.uidesign), Number(student.testing), Number(student.requirements), Number(student.projectmanager)]).reduce((sum, val) => sum + val, 0)
      return score1 - score2
    }) //Sort the groups by aggregate score, lowest to highest

        //This is the part where we assign the leftover students over the groups
        //Object.values(role) = [{"1": [{student}]}, repeat"2"]
        //.flatMap = scrapping timezone turning it into [{student1}, {student2}]
  ;[...noSurveyStudents, ...Object.values(role).flatMap((studentsByTimezone) => Object.values(studentsByTimezone).flat())].forEach((student) => {
    const group = arrayOfGroups.shift()
    group.push(student)
    arrayOfGroups.push(group)
  })

  //At this stage all students have been sorted. In the arrayOfGroups array. [[{student1}, {student2}, {student3}], [group2]]
  // let strengths = [Number(-Infinity), Number(student.uidesign), Number(student.testing), Number(student.requirements), Number(student.projectmanager)]
  const csvRows = arrayOfGroups.flatMap((groupOfStudents, index) =>
    groupOfStudents.map((student) => [
        index + 1, student.studentid, '"' + student.studentname + '"', student.coding, student.uidesign, student.testing, student.requirements, student.projectmanger, student.concentration1, student.timezonefromutc
    ].join(','))
  )

  csvRows.unshift('groupNumber,studentid')

  const csvString = csvRows.join('\n') //Data for csv
  const fileName = 'Example1.csv'



  //creates csvString
  res.attachment(fileName)
  res.status(200).send(csvRows2)


  // res.status(200).send(JSON.stringify(arrayOfGroups))



  //Once algorithim assigns them to teams, add it into the database
  //Send the results back in json form or put it into an excel file and send it back?
  // res.status(200).send(JSON.stringify(arrayOfGroups));

});

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})