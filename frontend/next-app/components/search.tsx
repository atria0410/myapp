import { ChangeEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { TextField, InputAdornment } from '@mui/material'

type Props = {
  placeholder?: string
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  width?: string | number
}

export default function Search({ placeholder = '検索', value, onChange, width = 'auto' }: Props) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event)}
      sx={{ width: width }}
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}
