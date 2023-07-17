import { useState } from 'react'
import Link from 'next/link'
import { sendPasswordResetEmail } from '@/api/v1/sessions'
import { EmailField } from '@/components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// フォーム項目型
interface PasswordResetForm {
  email: string
}

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('メールアドレスを入力してください')
})

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { control, handleSubmit } = useForm<PasswordResetForm>({
    resolver: yupResolver<PasswordResetForm>(schema)
  })

  const onSubmit: SubmitHandler<PasswordResetForm> = async ({ email }) => {
    const { result, message } = await sendPasswordResetEmail(email)

    if (result) {
      setSuccessMessage(message)
      setErrorMessage('')
    } else {
      setErrorMessage(message)
      setSuccessMessage('')
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Grid item>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Card sx={{ width: 500, px: 1, py: 2 }}>
          <CardContent>
            <Stack spacing={5}>
              <Typography align="center" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                パスワードを忘れた場合
              </Typography>
              <EmailField control={control} name="email" label="メールアドレス" />
              <Stack direction="row" spacing={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  sx={{ flexGrow: 1 }}
                  component={Link}
                  href="/logIn"
                >
                  戻る
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  sx={{ flexGrow: 1 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  送信
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
