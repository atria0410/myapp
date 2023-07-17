import { CircularProgress, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'

type Props = {
  open: boolean
  message?: string
}

export default function Loading({ open, message = 'Now Loading...' }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <Typography align="center" sx={{ mb: 2 }}>
          <CircularProgress size={60} />
        </Typography>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
