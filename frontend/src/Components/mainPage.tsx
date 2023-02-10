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
    marginBottom: '30px'
}

const mainPage = () => {
    return (
        <Box sx={bigBox}>
            <Box sx={buttonHolder}>
                <Button> Boston University</Button>
                <Button> Generate Team Report</Button>
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
                <Typography  variant='h6' sx={stylingH6}>
                    Please enter your BU ID
                </Typography>
                <TextField>
                </TextField>
            </Box>
            <Typography  variant='h6'>
                The information provided on this form will only be used to assign students to teams.
                This information has no impact on student’s grade.
            </Typography>
            <Button>
                Next
            </Button>
        </Box>
    );
}


export default mainPage;