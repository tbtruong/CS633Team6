import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import Slider from '@mui/material/Slider';


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

const MainPage = () => {

    const [age, setAge] = React.useState('');

    let exampleJson = {
        firstName: 'John',
        middleName: 'Andrew',
        lastName: 'Smith',
        buId: 'U12345678'
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    const marks = [
        {
            value: 0,
            label: 'No Experience',
        },
        {
            value: 100,
            label: 'Very Experienced',
        },
    ];



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
            <Typography  variant='h6' sx={{marginTop: '50px'}}>
                The information provided on this form will only be used to assign students to teams.
            </Typography >
            <Typography  variant='h6' sx={{marginBottom: '50px'}}>
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
                Please describe your main work responsibilties
            </Typography>
            <TextField fullWidth required id="outlined-basic"   InputLabelProps={{ shrink: true }} variant="outlined" />

            <Typography>
                Where are you located?
            </Typography>
            <Box>
            <FormControl size="medium" sx={locationSelect}>
                <InputLabel id="demo-simple-select-label" > Country </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Country"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="medium" sx={locationSelect}>
                <InputLabel id="demo-simple-select-label" > State </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Country"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="medium" sx={locationSelect}>
                <InputLabel id="demo-simple-select-label" >Timezone</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Timezone"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </Box>

            <Typography>
                Please rank the following course project roles based on your experience
            </Typography>
            <Box>
                <Box sx={{width: 300, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography>
                    No Experience
                </Typography>

                <Typography>
                    Very Experienced
                </Typography>
                </Box>

            <Box sx={{ width: 300, display: 'flex', flexDirection: 'row' }}>
                <Typography>
                    Coding:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography>
                    Requirements:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography>
                    Testing:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography>
                    UI Design:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography>
                    Project Management:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>
        </Box>

        <Typography>
           In a brief paragraph, please describe your experience in the above 5 categories.
        </Typography>
        <TextField sx={{width: '300px'}} fullWidth required id="outlined-basic"   InputLabelProps={{ shrink: true }} variant="outlined"  inputProps={{ maxLength: 12 }}/>


        </Box>
    );
}


export default MainPage;