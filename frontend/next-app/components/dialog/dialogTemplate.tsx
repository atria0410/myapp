import { ReactNode } from 'react'
import { Dialog, DialogTitle, DialogActions, Typography, Button } from '@mui/material'

type Props = {
  open: boolean
  message?: string
  onClickOk?: Function
  onClickCancel?: Function
  children: ReactNode
}

export default function DialogTemplate({ open, message, onClickOk, onClickCancel, children }: Props) {
  return (
    <Dialog open={open} sx={{ '.MuiPaper-root': { minWidth: 400, py: 2 } }}>
      <Typography align="center">{children}</Typography>
      <DialogTitle textAlign="center">{message}</DialogTitle>
      <DialogActions style={{ justifyContent: 'space-around' }}>
        {(() => {
          if (onClickOk) {
            return (
              <Button variant="contained" color="info" onClick={() => onClickOk()} disableElevation sx={{ width: 120 }}>
                OK
              </Button>
            )
          }
        })()}
        {(() => {
          if (onClickCancel) {
            return (
              <Button
                variant="outlined"
                color="info"
                onClick={() => onClickCancel()}
                disableElevation
                sx={{ width: 120 }}
              >
                キャンセル
              </Button>
            )
          }
        })()}
      </DialogActions>
    </Dialog>
  )
}
