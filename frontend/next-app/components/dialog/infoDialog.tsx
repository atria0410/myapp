import { Info } from '@mui/icons-material'
import DialogTemplate from './dialogTemplate'

type Props = {
  open: boolean
  message?: string
  onClickOk?: Function
  onClickCancel?: Function
}

export default function InfoDialog({ open, message, onClickOk, onClickCancel }: Props) {
  return (
    <DialogTemplate open={open} message={message} onClickOk={onClickOk} onClickCancel={onClickCancel}>
      <Info color="info" sx={{ fontSize: 80 }} />
    </DialogTemplate>
  )
}
