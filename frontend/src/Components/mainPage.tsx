import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, TextField} from "@mui/material"

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

const mainPage = () => {
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
                <br></br>
                <br></br>
                <br></br>
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
                <br></br>
                <br></br>
                The information provided on this form will only be used to assign students to teams.
                This information has no impact on student’s grade.
                <br></br>
                <br></br>
            </Typography >
            <Button variant="contained" size="large" sx={buttonHolder} >
              NEXT
            </Button>
        </Box>
    );
}


export default mainPage;