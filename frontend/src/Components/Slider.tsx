import React from 'react';
import {Box} from "@mui/material"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"

interface SliderComponentProps {
    typography: string,
    sliderCallback: (value: number) => void
}


//Takes in title, callback function,
const SliderComponent = ({typography, sliderCallback}: SliderComponentProps) => {

    const [value, setValue] = React.useState<number>(30);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        sliderCallback(newValue as number)
    };

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
        <Box sx={{ width: 300 }}>
            <Typography>
                {typography}:
            </Typography>
            <Slider
                defaultValue={0}
                step={10}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
    );
}

export default SliderComponent;