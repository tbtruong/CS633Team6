import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import Slider from '@mui/material/Slider';
import Selector from "./Selector"
import SliderComponent from "./Slider"

//Examples
const countryOptions = [
    {
        "value": "MA",
        "label": "Massachusetts"
    },
    {
        "value": "NY",
        "label": "New York"
    },
    {
        "value": "State two letter identifier",
        "label": "State Name Spelled Out"
    }
]

const stateOptions = [
    {
        "value": "MA",
        "label": "Massachusetts"
    },
    {
        "value": "NY",
        "label": "New York"
    },
    {
        "value": "State two letter identifier",
        "label": "State Name Spelled Out"
    }
]

const timezoneOptions = [
    {
        "value": -5,
        "label": "Eastern Standard Time (EST)",
    },
    {
        "value": 0, //The UTC value
        "label": "The full name of timezone and acronym of the timezone"
    }
]


//Styling
const stylingH3 = {
    color: "black",
    fontSize: "50px",
    marginBottom: "40px"
}

const stylingH4 = {
    color: "black",
    fontSize: "40px",
    marginBottom: "30px"
}
const stylingH5 = {
    color: "black",
    fontSize: "30px",
    marginBottom: "20px"
}

const stylingH6 = {
    color: "black",
    fontSize: "20px",
    marginBottom: "1px"
}


const bigBox = {
 //CSS
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const buttonHolder = {
//CSS
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'right'

}

const locationSelect = {
    width: '100px'
}


//Main Page
const MainPage = () => {

    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [timezone, setTimezone] = React.useState('');

    const [coding, setCoding] = React.useState(0);
    const [requirements, setRequirements] = React.useState(0);
    const [testing, setTesting] = React.useState(0);
    const [ui, setUi] = React.useState(0);
    const [projectManagement, setProjectManagement] = React.useState(0);


    let exampleJson = {
        firstName: 'John',
        middleName: 'Andrew',
        lastName: 'Smith',
        buId: 'U12345678'
    }




    return (
        <Box sx={bigBox}>
            <Box sx={buttonHolder}>
                <Button> Boston University</Button>
                <Button variant="contained" size="large">
                    Teams Report
                </Button>
            </Box>
            <Typography variant='h3' sx={stylingH3}>
                Boston University's Metropolitan College
            </Typography>
            <Typography variant='h4' sx={stylingH4}>
                Welcome to the Pre-course Survey
            </Typography>
            <Typography variant='h5'sx={stylingH5}>
                CS633: Software Quality, Testing, and Security Management
            </Typography>
            <Typography  variant='h5' sx={stylingH5}>
                Spring 2023
            </Typography>
            <Box>
                <TextField
                          required
                          id="BU-ID"
                          label="Please enter your BU ID"
                          //defaultValue=" "
                          size="medium"
                          InputLabelProps={{ shrink: true }}
                        />
            </Box>
            <Typography  variant='h6'>
                The information provided on this form will only be used to assign students to teams.
                This information has no impact on student’s grade.

            </Typography >
            <Button variant="contained" size="large" sx={buttonHolder} >
              NEXT
            </Button>


            <Typography>
                BU ID: {exampleJson.buId} <br/>
                First Name: {exampleJson.firstName}  <br/>
                Middle Name: {exampleJson.middleName}  <br/>
                Last Name: {exampleJson.lastName} <br/>
            </Typography>

            <Typography>
                Organization you are currently working for
            </Typography>

            <TextField fullWidth required id="outlined-basic" label="Organization you are currently working for"  InputLabelProps={{ shrink: true }} variant="outlined" />

            <Typography>
                Please describe your main work responsibilities
            </Typography>

            <TextField fullWidth required id="outlined-basic"  InputLabelProps={{ shrink: true }} variant="outlined" />

            <Typography>
                Where are you located?
            </Typography>

            //3 Forms: 1 for Country, State, Timezone
            <Box>
                <Selector selectorCallback={setCountry} selectorOptions={countryOptions}></Selector>
                <Selector selectorCallback={setState} selectorOptions={stateOptions}></Selector>
                <Selector selectorCallback={setTimezone} selectorOptions={timezoneOptions}></Selector>
            </Box>

            <Typography>
                Please rank the following course project roles based on your experience
            </Typography>

            <Box>
                <SliderComponent typography={'Coding'} sliderCallback={setCoding}/>
                <SliderComponent typography={'Requirements'} sliderCallback={setRequirements}/>
                <SliderComponent typography={'Testing'} sliderCallback={setTesting}/>
                <SliderComponent typography={'UI'} sliderCallback={setUi}/>
                <SliderComponent typography={'Project Management'} sliderCallback={setProjectManagement}/>
            </Box>

        <Typography>
           In a brief paragraph, please describe your experience in the above 5 categories.
        </Typography>
        <TextField sx={{width: '300px'}} fullWidth required id="outlined-basic"   InputLabelProps={{ shrink: true }} variant="outlined"  inputProps={{ maxLength: 12 }}/>



        </Box>
    );
}


export default MainPage;