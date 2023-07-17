import { Control, Controller } from 'react-hook-form'
import { FormControl, FormLabel, FormControlLabel, FormHelperText, RadioGroup, Radio as MuiRadio } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  options: { value: any; label: string; disabled?: boolean }[]
  row?: boolean
  disabled?: boolean
}

export default function Radio({ control, name, label, options, row, disabled }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid} disabled={disabled}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup value={value} onChange={(_, value) => onChange(value)} row={row}>
            {options.map((option) => (
              <FormControlLabel
                control={<MuiRadio />}
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
