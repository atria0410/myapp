import { ReactNode } from 'react'
import { Paper as MuiPaper } from '@mui/material'

type Props = {
  children: ReactNode
}

export default function Paper({ children }: Props) {
  return (
    <MuiPaper sx={{ px: 4, py: 3 }} elevation={0} variant="outlined">
      {children}
    </MuiPaper>
  )
}
