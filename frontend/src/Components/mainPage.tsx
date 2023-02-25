import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material"
import Selector from "./Selector"
import SliderComponent from "./Slider"
import axios, {AxiosError} from "axios"
import stateOptions from './mockData/stateMenuItems.json'
import timezoneOptions from './mockData/timezoneMenuItems.json'
import generateLogo from '../SVG/generate.png';
import teamLogo from '../SVG/logo.png';
import nextLogo from '../SVG/next.png';
import submitLogo from '../SVG/submit.png';


//Styling
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
    marginBottom: "1px",
    justifyContent: "center",
    alignItems: "center"
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

const stylingH7BottomSpace = {
    color: "gray",
    fontSize: "12px",
    marginBottom: "30px"
}

const LargeTexBox = {
    width: 600,
    height: 50,
    marginTop: "30px"

}

const buttonHolder = {
//CSS
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'

}


const bigBox = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}



const buttonImageStyle = {
    padding: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': {
        background: 'none',
    },
    marginTop: '1rem'
}

const buttonImageStyleSubmit = {
    padding: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': {
        background: 'none',
    },
    marginTop: '2rem'
}

const countryOptions = [
    {
        value: "USA",
        label: "United States"
    },
    {
        value: "N/A",
        label: "Other"
    }
]


//Main Page
const MainPage = () => {
    const [buId, setBuId] = React.useState('U');

    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [timezone, setTimezone] = React.useState('');

    const [coding, setCoding] = React.useState(0);
    const [requirements, setRequirements] = React.useState(0);
    const [testing, setTesting] = React.useState(0);
    const [ui, setUi] = React.useState(0);
    const [projectManagement, setProjectManagement] = React.useState(0);

    const [nextPage, setNextPage] = React.useState(false);

    const [responsibilities, setResponsibilities] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [organization, setOrganization] = React.useState('');

    const [userData, setUserData] = React.useState({"firstName": "", "middleName": "", "lastName": "", "buId": ""})

    const [open, setOpen] = React.useState(false);
    const [dialogHeader, setDialogHeader] = React.useState("");
    const [dialogMessage, setDialogMessage] = React.useState("");

    const [disable, setDisabled] = React.useState(false)



    const handleDownload = () => {
        axios({
            url: "/generateTeams",
            method: "GET",
            responseType: "blob",
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "data.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkBuId = () => {
        // Send Axios request here
        axios.get("/checkId", {
            params: {id: buId}
        }).then(resp => {
            console.log(resp.status)
            if (resp.status === 200) {
                //Extract out student information from resp  and set it into state
                setUserData(resp.data)
                setNextPage(true);
            }
            else if (resp.status === 201) {
                //Make a dialog?
                setDialogHeader("Survey Already Submitted")
                setDialogMessage("If you believe this might be an error, please contact the professor")
                setOpen(true)
            } else {
                //Make a dialog saying invalid id

                setDialogHeader("Id invalid")
                setDialogMessage("The Id submitted did not match anyone in the roster. Please try again")
                setOpen(true)
            }
        });
    }

    const handleSubmit =  async () => {
        // event?.preventDefault()
        const data =  {
            "StudentId": buId,
            "Organization": organization,
            "Responsibilities": responsibilities,
            "Country": country,
            "State": state,
            "TimezoneFromUTC": timezone,
            "Coding": coding,
            "Requirements": requirements,
            "Testing": testing,
            "UIDesign": ui,
            "ProjectManager": projectManagement,
            "Experience": experience,
            "SurveyDate": new Date()
        }

        try {
            await axios.post('/formSubmission', data).then((resp) => {
                //successful adding
                if (resp.status === 200) {
                    setDialogHeader("Survey submitted")
                    setDialogMessage("Thank you for submitting the survey. You may now leave the page")
                    setDisabled(true)
                    setOpen(true)
                }
                //Open dialog

            })
        } catch (err: any | AxiosError) {
            console.log(err.message)
        }
    }

    return (
        <Box sx={bigBox}>
            <Box sx={buttonHolder}>
                <Box sx={buttonImageStyle}>
                    <img src={teamLogo} style={{
                        width: '475px',
                        height: '202px',
                        objectFit: 'cover',
                    }} alt="My Image" />
                </Box>
            </Box>
            <Typography variant='h3' sx={stylingH4}>
                Boston University's Metropolitan College
            </Typography>
            <Typography variant='h5' sx={stylingH5}>
                Welcome to the Pre-course Survey
            </Typography>
            <Typography variant='h6' sx={stylingH6}>
                CS633: Software Quality, Testing, and Security Management
            </Typography>
            <Typography  variant='h6' sx={stylingH6}>
                Spring 2023
                <br></br>
                <br></br>
            </Typography>
            <Box>
                <TextField
                          sx={{width: '300px'}}
                          required
                          id="BU-ID"
                          label="Please enter your BU ID (UXXXXXXXX Format)"
                          value={buId}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              setBuId(event.target.value);
                          }}
                          size="medium"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: 15 }}
                        />
            </Box>
            <Typography sx={stylingH7}>
                The information provided on this form will only be used to assign students to teams.
            </Typography >
            <Typography sx={stylingH7BottomSpace}>
                This information has no impact on student’s grade.
            </Typography >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogHeader}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>
            {nextPage ? <Box sx={bigBox}>
                    <Typography  sx={stylingH6}>
                        <b> All information is required in order for Submit button to be enabled </b>
                    </Typography >

                <Typography sx={{stylingH6, marginTop: '30px'}}>
                    BU ID: <b> {userData.buId} </b> <br/>
                    Name: <b>{userData.firstName} {userData.middleName} {userData.lastName}</b> <br/>
                </Typography>


                <TextField
                    required
                    sx={LargeTexBox}
                    id="outlined-basic"
                    label="Organization you are currently working for"
                    value={organization}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOrganization(event.target.value);
                    }}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 127}}
                />

                <TextField
                    sx={LargeTexBox}
                    required
                    id="outlined-basic"
                    value={responsibilities}
                    label="Please describe your main work responsibilties"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setResponsibilities(event.target.value);
                    }}
                    inputProps={{ maxLength: 255 }}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <Typography sx={stylingH7}>
                    <br/> <b> Where are you located? </b>
                </Typography>

                <Box>
                <Selector selectorText={'Country'} selectorCallback={setCountry} selectorOptions={countryOptions}></Selector>
                { country === 'USA' && <Selector selectorText={'State'} selectorCallback={setState} selectorOptions={stateOptions}></Selector> }
                <Selector selectorText={'Timezone'} selectorCallback={setTimezone} selectorOptions={timezoneOptions}></Selector>
                </Box>

                <Typography sx={stylingH7} >
                <br/> Please rank the following course project roles based on your experience
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

                <SliderComponent typography={'Coding'} sliderCallback={setCoding}/>
                <SliderComponent typography={'Requirements'} sliderCallback={setRequirements}/>
                <SliderComponent typography={'Testing'} sliderCallback={setTesting}/>
                <SliderComponent typography={'UI'} sliderCallback={setUi}/>
                <SliderComponent typography={'Project Management'} sliderCallback={setProjectManagement}/>
                </Box>

                <br></br>

                <TextField
                    sx={LargeTexBox}
                    required
                    id="Experience"
                    label="In a brief paragraph, please describe your experience in the above 5 categories."
                    value={experience}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setExperience(event.target.value);
                    }}
                    inputProps={{ maxLength: 255 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Button sx={buttonImageStyleSubmit} onClick={() => handleSubmit()} disabled={(buId === '' || country  === '' || timezone === '' || responsibilities  === '' || experience  === '' || organization  === '' || disable)}>
                    <img src={submitLogo} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} alt="My Image" />
                </Button>
                </Box>
                : <Box sx={buttonHolder}>
                    <Button sx={buttonImageStyle} onClick={() => { checkBuId()}}>
                        <img src={nextLogo} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }} alt="My Image" />
                    </Button>
                    <Button sx={buttonImageStyle} onClick={handleDownload} disableRipple>
                        <img src={generateLogo} style={{
                            width: '170px',
                            height: '75px',
                        }} alt="My Image" />
                    </Button>
                </Box>
            }
        </Box>
    );
}


export default MainPage;