import React, {FormEvent} from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material"
import Selector from "./Selector"
import SliderComponent from "./Slider"
import axios, {AxiosError} from "axios"
import stateOptions from './mockData/stateMenuItems.json'
import timezoneOptions from './mockData/timezoneMenuItems.json'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';


const teamBuilderIcon = require('../SVG/TeamBuilderLogo.svg') as string;


function MySvgIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <g id="Layer_1-2" data-name="Layer 1">
                <g>
                    <rect className="cls-3" x=".5" y=".5" width="474" height="201"/>
                    <path d="m474,1v200H1V1h473m1-1H0v202h475V0h0Z"/>
                </g>
                <path className="cls-2" d="m459,15v171.45H17.92V15h441.08m5-5H12.92v181.45h451.08V10h0Z"/>
                <text className="cls-1" transform="translate(124.04 82.68)">
                    <tspan x="0" y="0">TEAM</tspan>
                    <tspan x="-67.25" y="86.4">BUILDER</tspan>
                </text>
            </g>
        </SvgIcon>
    );
}


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
    const [buId, setBuId] = React.useState('');

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

    const [open, setOpen] = React.useState(true);
    const [dialogHeader, setDialogHeader] = React.useState("");
    const [dialogMessage, setDialogMessage] = React.useState("");



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

    const handleClickOpen = () => {
        setOpen(true);
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
                console.log('survey already submitted')
                //Make a dialog?
                console.log('in survey already submitted')
                setDialogHeader("Survey Already Submitted")
                setDialogMessage("If you believe this might be an error, please contact the professor")
                setOpen(true)
            } else {
                //Make a dialog saying invalid id
                console.log('invalid id')
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
                    setDialogMessage("Thank you for submitting the survey")
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
                <MySvgIcon/>
                <Button variant="contained" size="large" onClick={handleDownload}>
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
                          value={buId}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              setBuId(event.target.value);
                          }}
                          size="medium"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ maxLength: 15 }}
                        />
            </Box>
            <Typography  variant='h6'>
                The information provided on this form will only be used to assign students to teams.
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
            {nextPage ? <Box>
                <Typography>
                    BU ID: {userData.buId} <br/>
                    First Name: {userData.firstName}  <br/>
                    Middle Name: {userData.middleName}  <br/>
                    Last Name: {userData.lastName} <br/>
                </Typography>

                <Typography>
                    Organization you are currently working for
                </Typography>

                <TextField
                    required
                    id="Organization "
                    label="Organization you are currently working for"
                    value={organization}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOrganization(event.target.value);
                    }}
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 127}}
                />

                <Typography>
                Please describe your main work responsibilities
                </Typography>


                <TextField
                    required
                    id="Responsibilities"
                    value={responsibilities}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setResponsibilities(event.target.value);
                    }}
                    size="medium"
                    inputProps={{ maxLength: 255 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Typography>
                Where are you located?
                </Typography>

                //3 Forms: 1 for Country, State, Timezone
                <Box>
                {/*<Selector selectorCallback={setCountry} selectorOptions={countryOptions}></Selector>*/}
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

                <TextField
                    required
                    id="Experience"
                    label="Experience"
                    value={experience}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setExperience(event.target.value);
                    }}
                    size="medium"
                    inputProps={{ maxLength: 255 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Button onClick={() => handleSubmit()}> SUBMIT </Button>
                </Box>

                : <Box><Button variant="contained" size="large" sx={buttonHolder} onClick={() => { checkBuId()}}>
                    NEXT
                </Button></Box>
            }
        </Box>
    );
}


export default MainPage;

/*
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import myImage from './my-image.png';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));


const MyImageButton = () => {
  const classes = useStyles();

  return (
    <Button className={classes.button}>
      <img src={myImage} alt="My Image" className={classes.img} />
    </Button>
  );
};

 */