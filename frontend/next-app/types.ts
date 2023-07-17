/**
 * エラー
 */
export type Errors = {
  [key: string]: string[]
}

/**
 * ユーザー
 */
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  lockVersion: number
  createdAt: Date | string
  updatedAt: Date | string
}
