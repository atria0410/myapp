import Breadcrumbs from '@/components/breadcrumbs'
import Paper from '@/components/paper'
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { toast } from 'react-toastify'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'toast', link: '/sample/toast' }
]

export default function Toast() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Paper>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={() => toast('Default')}>
            Default
          </Button>

          <Button variant="contained" color="info" startIcon={<Info />} onClick={() => toast.info('Info')}>
            Info
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            onClick={() => toast.success('Success')}
          >
            SUCCESS
          </Button>

          <Button variant="contained" color="warning" startIcon={<Warning />} onClick={() => toast.warning('Warning')}>
            WARNING
          </Button>

          <Button variant="contained" color="error" startIcon={<Error />} onClick={() => toast.error('Error')}>
            ERROR
          </Button>
        </Stack>
      </Paper>
    </>
  )
}
