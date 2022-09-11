import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material'

interface ChooseXPlayerRadioGroupProps {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  labels: Array<string>
  className?: string
}

const ChooseXPlayerRadioGroup: React.FC<ChooseXPlayerRadioGroupProps> = ({ value, handleChange, labels, className }) => {
  return (
    <FormControl className={className}>
      <FormLabel color="secondary">Who will play for X?</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio color="secondary" />} label={labels[0]} />
        <FormControlLabel value="2" control={<Radio color="secondary" />} label={labels[1]} />
        <FormControlLabel value="0" control={<Radio color="secondary" />} label={labels[2]} />
      </RadioGroup>
    </FormControl>
  )
}

export default ChooseXPlayerRadioGroup
