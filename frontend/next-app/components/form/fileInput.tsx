import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { TextField, InputAdornment } from '@mui/material'

type Props = {
  control: Control<any>
  name: string
  accept?: string
  label?: string
  required?: boolean
  disabled?: boolean
  width?: string | number
}

export default function FileInput({ control, name, accept, label, required, disabled, width }: Props) {
  const [value, setValue] = useState<string>('')

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field: { onChange }, fieldState: { invalid, error } }) => (
        <>
          <input
            id="file-input-entity"
            type="file"
            accept={accept}
            value={value}
            onChange={(event) => {
              if (!event.target.files) return
              setValue(event.target.value)
              onChange(event.target.files[0])
            }}
            style={{ display: 'none' }}
          />
          <TextField
            value={value}
            label={label}
            required={required}
            disabled={disabled}
            error={invalid}
            helperText={error?.message}
            placeholder="ファイルを選択してください"
            size="small"
            onClick={() => document.getElementById('file-input-entity')?.click()}
            sx={{ width: width }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon />
                </InputAdornment>
              )
            }}
          />
        </>
      )}
    />
  )
}
