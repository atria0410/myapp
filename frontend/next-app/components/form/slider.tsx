import { Control, Controller } from 'react-hook-form'
import { FormControl, FormLabel, FormHelperText, Slider as MuiSlider } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  label?: string
  min?: number
  max?: number
  step?: number
  marks?: { value: number; label: string }[]
  disabled?: boolean
  width?: string | number
}

export default function Slider({ control, name, label, min, max, step, marks, disabled, width = '100%' }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid}>
          <FormLabel>{label}</FormLabel>
          <MuiSlider
            value={value}
            onChange={(_, value) => onChange(value as number)}
            min={min}
            max={max}
            step={step}
            marks={marks}
            disabled={disabled}
            sx={{ width: width }}
            valueLabelDisplay="auto"
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
