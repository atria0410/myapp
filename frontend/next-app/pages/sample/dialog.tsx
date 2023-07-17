import { useState } from 'react'
import Breadcrumbs from '@/components/breadcrumbs'
import { ConfirmDialog, ErrorDialog, InfoDialog, SuccessDialog, WarningDialog } from '@/components/dialog'
import Paper from '@/components/paper'
import { CheckCircle, Error, Help, Info, Warning } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'dialog', link: '/sample/dialog' }
]

export default function Dialog() {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)
  const [openError, setOpenError] = useState(false)

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Paper>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" startIcon={<Help />} onClick={() => setOpenConfirm(true)}>
            Confirm
          </Button>

          <Button variant="contained" color="info" startIcon={<Info />} onClick={() => setOpenInfo(true)}>
            Info
          </Button>

          <Button variant="contained" color="success" startIcon={<CheckCircle />} onClick={() => setOpenSuccess(true)}>
            SUCCESS
          </Button>

          <Button variant="contained" color="warning" startIcon={<Warning />} onClick={() => setOpenWarning(true)}>
            WARNING
          </Button>

          <Button variant="contained" color="error" startIcon={<Error />} onClick={() => setOpenError(true)}>
            ERROR
          </Button>
        </Stack>

        <ConfirmDialog
          open={openConfirm}
          message="よろしいですか？"
          onClickOk={() => setOpenConfirm(false)}
          onClickCancel={() => setOpenConfirm(false)}
        />

        <InfoDialog open={openInfo} message="ここにメッセージを表示します" onClickOk={() => setOpenInfo(false)} />

        <SuccessDialog open={openSuccess} message="処理が完了しました" onClickOk={() => setOpenSuccess(false)} />

        <WarningDialog
          open={openWarning}
          message="本当によろしいですか？"
          onClickOk={() => setOpenWarning(false)}
          onClickCancel={() => setOpenWarning(false)}
        />

        <ErrorDialog open={openError} message="エラーが発生しました" onClickOk={() => setOpenError(false)} />
      </Paper>
    </>
  )
}
