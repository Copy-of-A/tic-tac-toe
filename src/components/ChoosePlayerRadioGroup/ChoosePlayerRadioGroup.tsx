import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";

interface ControlledRadioButtonsGroupProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    labels: Array<string>
}

 const ChoosePlayerRadioGroup: React.FC<ControlledRadioButtonsGroupProps> = ({value, handleChange, labels}) => {
    return (
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Who play for X</FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={value}
            name="radio-buttons-group"
            onChange={handleChange}
        >
            <FormControlLabel value="1" control={<Radio />} label={labels[0]} />
            <FormControlLabel value="2" control={<Radio />} label={labels[1]} />
            <FormControlLabel value="0" control={<Radio />} label={labels[2]} />
        </RadioGroup>
    </FormControl>
    )
}

export default ChoosePlayerRadioGroup