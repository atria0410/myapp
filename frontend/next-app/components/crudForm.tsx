import { ReactNode } from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'

type CrudFormProps = {
  open: boolean
  mode: 'new' | 'edit'
  onClickCreate: () => void
  onClickUpdate: () => void
  onClickDelete: () => void
  onClickCancel: () => void
  children: ReactNode
}

export default function CrudForm({
  open,
  mode,
  onClickCreate,
  onClickUpdate,
  onClickDelete,
  onClickCancel,
  children
}: CrudFormProps) {
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>
      <DialogActions sx={{ p: 3 }}>
        {mode === 'new' ? (
          <>
            <Button variant="contained" onClick={onClickCreate} disableElevation sx={{ width: 110 }} color="success">
              登録
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={onClickUpdate} disableElevation sx={{ width: 110 }} color="success">
              更新
            </Button>
            <Button variant="contained" onClick={onClickDelete} disableElevation sx={{ width: 110 }} color="error">
              削除
            </Button>
          </>
        )}
        <Button variant="outlined" onClick={onClickCancel} disableElevation sx={{ width: 110 }}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  )
}
