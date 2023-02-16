import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"

interface SelectorComponentProps {
    selectorOptions: {value: string | number, label: string}[],
    selectorCallback: (value: string) => void
}

const Selector = ({selectorOptions, selectorCallback}: SelectorComponentProps) => {

    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        selectorCallback(event.target.value as string)
    }

    return (
        <FormControl size="medium">
            <InputLabel id="demo-simple-select-label" > Country </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Country"
                onChange={handleChange}
            >
                {selectorOptions.map((item) => {
                   return <MenuItem value={item.value}> {item.label} </MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default Selector;