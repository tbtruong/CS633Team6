import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, TextField} from "@mui/material"

const mainPage = () => {
    return (
        <Box>
            <Typography variant='h3'>
                Boston University's Metropolitan College
            </Typography>
            <Typography variant='h4'>
                Welcome to the Pre-course Survey
            </Typography>
            <Typography variant='h5'>
                CS633: Software Quality, Testing, and Security Management
            </Typography>
            <Typography  variant='h5'>
                Spring 2023
            </Typography>
            <Typography  variant='h6'>
                Please enter your BU ID
            </Typography>
            <TextField>
            </TextField>
            <Button>
                Next
            </Button>
        </Box>
    );
}


export default mainPage;