import { Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import ja from 'date-fns/locale/ja'

type Props = {
  control: Control<any>
  name: string
  label?: string
  required?: boolean
  disabled?: boolean
  width?: string | number
}

export default function TimePicker({ control, name, label, required, disabled, width = '13ch' }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field, fieldState: { invalid, error } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          localeText={{
            okButtonLabel: '選択',
            cancelButtonLabel: 'キャンセル' // スマホのみ
          }}
        >
          <MuiTimePicker
            {...field}
            label={label}
            format="HH:mm"
            disabled={disabled}
            sx={{ width: width }}
            slotProps={{ textField: { error: invalid, helperText: error?.message, required, size: 'small' } }}
          />
        </LocalizationProvider>
      )}
    />
  )
}
