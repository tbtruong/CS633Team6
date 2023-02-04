import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, TextField} from "@mui/material"

const mainPage = () => {
    return (
        <Box>
            <Typography>
                Boston University's Metropolitan College
            </Typography>
            <Typography>
                Welcome to the Pre-course Survey
            </Typography>
            <Typography>
                CS633: Software Quality, Testing, and Security Management
            </Typography>
            <Typography>
                Spring 2023
            </Typography>
            <Typography>
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