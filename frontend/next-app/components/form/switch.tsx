import { Control, Controller } from 'react-hook-form'
import { FormControl, FormLabel, FormControlLabel, FormHelperText, Switch as MuiSwitch } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  onLabel?: string
  offLabel?: string
  disabled?: boolean
}

export default function Switch({ control, name, label, onLabel, offLabel, disabled }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid}>
          <FormLabel>{label}</FormLabel>
          <FormControlLabel
            label={value ? onLabel : offLabel}
            control={
              <MuiSwitch checked={value} onChange={(event) => onChange(event.target.checked)} disabled={disabled} />
            }
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
