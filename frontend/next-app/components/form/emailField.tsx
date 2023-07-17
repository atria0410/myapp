import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  required?: boolean
  disabled?: boolean
  width?: string | number
}

export default function EmailField({ control, name, label, required, disabled, width = '100%' }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          type="email"
          {...field}
          label={label}
          required={required}
          disabled={disabled}
          error={invalid}
          helperText={error?.message}
          size="small"
          sx={{ width }}
        />
      )}
    />
  )
}
