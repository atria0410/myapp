import { useLayoutEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCurrentUser, setCsrfToken } from '@/api/v1/sessions'
import Layout from '@/components/layout'
import createEmotionCache from '@/libs/createEmotionCache'
import theme from '@/libs/mui'
import '@/styles/globals.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  // ルーター
  const router = useRouter()

  // ページ表示フラグ（リダイレクト前に一瞬画面が表示されるのを防ぐため）
  const [showPage, setShowPage] = useState<boolean>(false)

  useLayoutEffect(() => {
    // CSRFトークンをCookieにセット
    setCsrfToken()
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      setShowPage(false)

      // 現在のユーザーを取得
      const currentUser = await getCurrentUser()

      switch (router.pathname) {
        case '/logIn':
        case '/signIn':
        case '/password_reset':
        case '/password_reset/[token]':
          if (currentUser !== null) {
            // 未ログインの場合、ホーム画面にリダイレクト
            router.push('/')
            return
          }
          break
        default:
          if (currentUser === null) {
            // 未ログインの場合、ログイン画面にリダイレクト
            router.push('/logIn')
            return
          }
          break
      }

      setShowPage(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer theme="colored" position="bottom-right" />
        <Layout>{showPage && <Component {...pageProps} />}</Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}
