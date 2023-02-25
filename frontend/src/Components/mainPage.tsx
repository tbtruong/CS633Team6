import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import Slider from '@mui/material/Slider';


const stylingH3 = {
    color: "black",
    fontSize: "45px",
    marginBottom: "40px"
}

const stylingH4 = {
    color: "black",
    fontSize: "35px",
    marginBottom: "30px"
}
const stylingH5 = {
    color: "black",
    fontSize: "25x",
    marginBottom: "20px"
}

const stylingH6 = {
    color: "black",
    fontSize: "15px",
    marginBottom: "1px"
}

const stylingH7 = {
    color: "gray",
    fontSize: "12px",
    marginBottom: "1px",
    marginTop: '30px'
}

const stylingH7LowSpace = {
    color: "gray",
    fontSize: "12px",
    marginBottom: "1px",
    marginTop: '10px'
}

const stylingH7LowSpaceUnderlined = {
    color: "gray",
    fontSize: "12px",
    marginBottom: "1px",
    marginTop: '10px'

}

const stylingH7BottomSpace = {
    color: "gray",
    fontSize: "12px",
    marginBottom: "30px"
}

const stylingH7NoSpace = {
    color: "gray",
    fontSize: "12px",
    //marginBottom: "10px"
}

const LargeTexBox = {
    width: 600,
    height: 50,
    marginTop: "30px"

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
    width: '200px'
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
            //label: 'No Experience',
        },
        {
            value: 100,
            //label: 'Very Experienced',
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
            <Typography variant='h3' sx={stylingH4}>
                Boston University's Metropolitan College
            </Typography>
            <Typography variant='h5' sx={stylingH5}>
                Welcome to the Pre-course Survey
            </Typography>
            <Typography variant='h6'sx={stylingH6}>
                CS633: Software Quality, Testing, and Security Management
            </Typography>
            <Typography  variant='h6' sx={stylingH6}>
                Spring 2023
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
            <Typography   sx={stylingH7}>
                The information provided on this form will only be used to assign students to teams.
            </Typography >
            <Typography  sx={stylingH7BottomSpace}>
                This information has no impact on student’s grade.
            </Typography >
            <Button variant="contained" size="large" sx={buttonHolder} >
              NEXT
            </Button>

            <Typography  sx={{stylingH6, marginTop: '30px'}}>
                    BU ID:<b>{exampleJson.buId}</b> <br/>
                    Name: <b>{exampleJson.firstName} {exampleJson.middleName} {exampleJson.lastName}</b> <br/>
            </Typography>

            <TextField  sx={LargeTexBox}
            required id="outlined-basic"
            label="Organization you are currently working for"
            InputLabelProps={{ shrink: true }} variant="outlined" />


            <TextField sx={LargeTexBox}
            required id="outlined-basic"
            label="Please describe your main work responsibilties"
            InputLabelProps={{ shrink: true }}
            variant="outlined" />

            <Typography   sx={stylingH7}>
                <br></br>Where are you located?
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

            <Typography  sx={stylingH7}>
                <br></br>Please rank the following course project roles based on your experience
            </Typography>
            <Box>
                <Box sx={{width: 300, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography sx={stylingH7LowSpace}>
                    <u>No Experience</u>
                </Typography>

                <Typography  sx={stylingH7LowSpace}>
                   <u>Very Experienced</u>
                </Typography>
                </Box>

            <Box sx={{ width: 300}}>
                <Typography  sx={stylingH7LowSpace}>
                    Coding:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography  sx={stylingH7LowSpace}>
                    Requirements:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography  sx={stylingH7LowSpace}>
                    Testing:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography  sx={stylingH7LowSpace}>
                    UI Design:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>

            <Box sx={{ width: 300 }}>
                <Typography sx={stylingH7LowSpace}>
                    Project Management:
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>
        </Box>
        <br></br>

        <TextField  sx={LargeTexBox}
        required id="outlined-basic"
        InputLabelProps={{ shrink: true }}
        label="In a brief paragraph, please describe your experience in the above 5 categories."
        variant="outlined"
        inputProps={{ maxLength: 12 }}/>

        <Typography sx={{marginTop: '100px'}}>

        </Typography>

        </Box>
    );
}


export default MainPage;