import { Error } from '@mui/icons-material'
import DialogTemplate from './dialogTemplate'

type Props = {
  open: boolean
  message?: string
  onClickOk?: Function
  onClickCancel?: Function
}

export default function ErrorDialog({ open, message, onClickOk, onClickCancel }: Props) {
  return (
    <DialogTemplate open={open} message={message} onClickOk={onClickOk} onClickCancel={onClickCancel}>
      <Error color="error" sx={{ fontSize: 80 }} />
    </DialogTemplate>
  )
}
