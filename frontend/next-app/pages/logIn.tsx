import Link from 'next/link'
import { useRouter } from 'next/router'
import { logIn } from '@/api/v1/sessions'
import { EmailField, PasswordField } from '@/components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

// フォーム項目型
interface LogInForm {
  email: string
  password: string
}

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('メールアドレスを入力してください'),
  password: yup.string().required('パスワードを入力してください')
})

export default function LogIn() {
  const router = useRouter()

  const { control, handleSubmit } = useForm<LogInForm>({
    resolver: yupResolver<LogInForm>(schema)
  })

  const onSubmit: SubmitHandler<LogInForm> = async ({ email, password }) => {
    const result = await logIn(email, password)

    if (result) {
      router.push('/')
    } else {
      toast.error('メールアドレスまたはパスワードが違います')
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Grid item>
        <Card sx={{ width: 500, px: 1, py: 2 }}>
          <CardContent>
            <Stack spacing={5}>
              <Typography align="center" sx={{ fontSize: 24, fontWeight: 'bold' }}>
                ログイン
              </Typography>
              <EmailField control={control} name="email" label="メールアドレス" />
              <PasswordField control={control} name="password" label="パスワード" />
              <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
                ログイン
              </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Stack spacing={2}>
              <Typography align="center" color="text.secondary">
                新規登録はこちら
              </Typography>
              <Button color="primary" variant="outlined" size="large" component={Link} href="/signIn">
                新規登録
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sx={{ mt: 3 }}>
        <Link href="/password_reset" style={{ textDecoration: 'none' }}>
          パスワードをお忘れですか？
        </Link>
      </Grid>
    </Grid>
  )
}
