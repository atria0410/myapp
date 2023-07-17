import { Control, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  options: Record<string, any>[]
  optionLabel: string
  label?: string
  required?: boolean
  disabled?: boolean
  disableClearable?: boolean
  width?: string | number
}

export default function Select({
  control,
  name,
  options,
  optionLabel,
  label,
  required,
  disabled,
  disableClearable,
  width = '100%'
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
        <Autocomplete
          value={value}
          onChange={(_, value) => onChange(value)}
          options={options}
          getOptionLabel={(option) => option[optionLabel] || ''}
          isOptionEqualToValue={(option, value) =>
            JSON.stringify(Object.entries(option).sort((a, b) => (a[0] > b[0] ? 1 : -1))) ===
            JSON.stringify(Object.entries(value).sort((a, b) => (a[0] > b[0] ? 1 : -1)))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              error={invalid}
              helperText={error?.message}
              size="small"
              sx={{ width: width }}
            />
          )}
          disabled={disabled}
          disableClearable={disableClearable}
        />
      )}
    />
  )
}
