import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from '@/api/v1/sessions'
import { EmailField, PasswordField, TextField } from '@/components/form'
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// フォーム項目型
interface SignInForm {
  lastName: string
  firstName: string
  email: string
  password: string
  passwordConfirmation: string
}

export default function SignIn() {
  const router = useRouter()
  const { control, handleSubmit, setError } = useForm<SignInForm>()

  const onSubmit: SubmitHandler<SignInForm> = async ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  }) => {
    const { result, errors } = await signIn(firstName, lastName, email, password, passwordConfirmation)

    if (result) {
      toast.success('登録が完了しました。')
      router.push('/')
    } else {
      for (const [key, messages] of Object.entries(errors)) {
        setError(key as keyof SignInForm, { message: messages[0] })
      }
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Grid item>
        <Card sx={{ width: 500, px: 1, py: 2 }}>
          <CardContent>
            <Stack spacing={5}>
              <Typography align="center" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                新規登録
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField control={control} name="lastName" label="苗字" />
                <TextField control={control} name="firstName" label="名前" />
              </Stack>
              <EmailField control={control} name="email" label="メールアドレス" />
              <PasswordField control={control} name="password" label="パスワード" />
              <PasswordField control={control} name="passwordConfirmation" label="パスワード（確認）" />
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
                  登録
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
