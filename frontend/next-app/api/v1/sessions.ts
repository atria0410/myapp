import $axios from '@/libs/axios'
import type { Errors } from '@/types'

/**
 * CSRFトークンをCookieにセットする
 */
export const setCsrfToken = async (): Promise<void> => {
  await $axios.get('set_csrf_token')
}

/**
 * ログインする
 * @param email メールアドレス
 * @param password パスワード
 * @returns 結果
 */
export const logIn = async (email: string, password: string): Promise<boolean> => {
  const res = await $axios.post('log_in', { email, password })
  return res.data.result === 'OK'
}

/**
 * ログアウトする
 * @returns 結果
 */
export const logOut = async (): Promise<boolean> => {
  const res = await $axios.post('log_out')
  return res.data.result === 'OK'
}

/**
 * サインインする
 * @param first_name 名前
 * @param last_name 苗字
 * @param email メールアドレス
 * @param password パスワード
 * @param passwordConfirmation パスワード（確認）
 * @returns result: 結果, errors: エラー
 */
export const signIn = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<{ result: boolean; errors: Errors }> => {
  const res = await $axios.post('sign_in', {
    first_name,
    last_name,
    email,
    password,
    passwordConfirmation
  })

  const result = res.data.result === 'OK'
  const errors = res.data.errors

  return { result, errors }
}

/**
 * パスワードリセットメールを送信する
 * @param email メールアドレス
 * @returns result: 結果, message: メッセージ
 */
export const sendPasswordResetEmail = async (email: string): Promise<{ result: boolean; message: string }> => {
  const res = await $axios.get('send_password_reset_email', { params: { email } })

  const result = res.data.result === 'OK'
  const message = res.data.message

  return { result, message }
}

/**
 * パスワードリセット
 * @param password パスワード
 * @param passwordConfirmation パスワード（確認）
 * @returns result: 結果, message: メッセージ
 */
export const passwordReset = async (
  token: string,
  password: string,
  passwordConfirmation: string
): Promise<{ result: boolean; message: string }> => {
  const res = await $axios.post('password_reset', {
    token,
    password,
    passwordConfirmation
  })

  const result = res.data.result === 'OK'
  const message = res.data.message

  return { result, message }
}

/**
 * 現在のユーザー情報を取得する
 * @returns 現在のユーザー
 */
export const getCurrentUser = async (): Promise<any> => {
  const res = await $axios.get('get_current_user')
  return res.data.currentUser
}
