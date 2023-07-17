import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  width?: string | number
}

export default function TextArea({ control, name, label, rows = 4, required, disabled, width = '100%' }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          {...field}
          label={label}
          required={required}
          disabled={disabled}
          error={invalid}
          helperText={error?.message}
          multiline
          rows={rows}
          size="small"
          sx={{ width }}
        />
      )}
    />
  )
}
