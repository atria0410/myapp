import { Control, Controller } from 'react-hook-form'
import { FormControl, FormLabel, FormControlLabel, FormHelperText, Checkbox as MuiCheckbox } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  boxLabel?: string
  disabled?: boolean
}

export default function Checkbox({ control, name, label, boxLabel, disabled }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid}>
          <FormLabel>{label}</FormLabel>
          <FormControlLabel
            label={boxLabel}
            control={
              <MuiCheckbox checked={value} onChange={(event) => onChange(event.target.checked)} disabled={disabled} />
            }
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
