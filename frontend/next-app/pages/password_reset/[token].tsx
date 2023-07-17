import { useState } from 'react'
import { useRouter } from 'next/router'
import { passwordReset } from '@/api/v1/sessions'
import { PasswordField } from '@/components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

// フォーム項目型
interface PasswordResetForm {
  password: string
  passwordConfirmation: string
}

const schema = yup.object({
  password: yup.string().required('パスワードを入力してください'),
  passwordConfirmation: yup
    .string()
    .required('パスワード（確認）とパスワードの入力が一致しません')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
})

export default function ForgotPassword() {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const { control, handleSubmit } = useForm<PasswordResetForm>({ resolver: yupResolver<PasswordResetForm>(schema) })

  const onSubmit: SubmitHandler<PasswordResetForm> = async ({ password, passwordConfirmation }) => {
    const token = location.pathname.split('/').pop() as string

    const { result, message } = await passwordReset(token, password, passwordConfirmation)

    if (result) {
      toast.success(message)
      router.push('/logIn')
    } else {
      setErrorMessage(message)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Grid item>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Card sx={{ width: 500, px: 1, py: 2 }}>
          <CardContent>
            <Stack spacing={5}>
              <Typography align="center" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                パスワードの再設定
              </Typography>
              <PasswordField control={control} name="password" label="新しいパスワード" />
              <PasswordField control={control} name="passwordConfirmation" label="新しいパスワード（確認）" />
              <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
                パスワードを変更する
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
