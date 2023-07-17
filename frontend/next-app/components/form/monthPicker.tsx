import { Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import ja from 'date-fns/locale/ja'

type Props = {
  control: Control<any>
  name: string
  label?: string
  minDate?: any
  maxDate?: any
  required?: boolean
  disabled?: boolean
  width?: string | number
}

export default function MonthPicker({
  control,
  name,
  label,
  minDate,
  maxDate,
  required,
  disabled,
  width = '18ch'
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field, fieldState: { invalid, error } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          dateFormats={{ monthAndYear: 'yyyy年 MM月' }}
          localeText={{
            okButtonLabel: '選択', // スマホのみ
            cancelButtonLabel: 'キャンセル' // スマホのみ
          }}
        >
          <MuiDatePicker
            {...field}
            label={label}
            views={['year', 'month']}
            format="yyyy年MM月"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            sx={{ width: width }}
            slotProps={{ textField: { error: invalid, helperText: error?.message, required, size: 'small' } }}
          />
        </LocalizationProvider>
      )}
    />
  )
}
