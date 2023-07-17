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

export default function DatePicker({
  control,
  name,
  label,
  minDate,
  maxDate,
  required,
  disabled,
  width = '22ch'
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
            previousMonth: '前月を表示',
            nextMonth: '次月を表示',
            okButtonLabel: '選択', // スマホのみ
            cancelButtonLabel: 'キャンセル' // スマホのみ
          }}
        >
          <MuiDatePicker
            {...field}
            label={label}
            format="yyyy年MM月dd日"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            slotProps={{ textField: { error: invalid, helperText: error?.message, required, size: 'small' } }}
            sx={{ width }}
          />
        </LocalizationProvider>
      )}
    />
  )
}
