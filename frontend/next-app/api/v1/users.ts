import $axios from '@/libs/axios'
import { Errors, User } from '@/types'
import { format } from 'date-fns'
import { saveAs } from 'file-saver'

/**
 * ユーザー一覧取得
 * @param searchWord 検索ワード
 * @param page ページ番号
 * @param pageSize 1ページのサイズ
 * @param sort 並び順 （例：'id asc'）
 * @returns users: ユーザー一覧、count: 総データ件数
 */
export const getUsers = async (
  searchWord?: string,
  page?: number,
  pageSize?: number,
  sort?: { [key: string]: string }
): Promise<{
  users: User[]
  count: number
}> => {
  const res = await $axios.get('users', {
    params: { searchWord, page, pageSize, sort }
  })

  // 日時をフォーマット
  res.data.users = res.data.users.map((item: User) => {
    item.createdAt = format(new Date(item.createdAt), 'yyyy/MM/dd HH:mm:ss')
    item.updatedAt = format(new Date(item.updatedAt), 'yyyy/MM/dd HH:mm:ss')
    return item
  })

  return res.data
}

/**
 * ユーザー取得
 * @param id ID
 * @returns ユーザー
 */
export const getUser = async (id: number): Promise<User> => {
  const res = await $axios.get(`users/${id}`)
  const user = res.data

  return user
}

/**
 * ユーザー登録
 * @param user ユーザー
 * @returns 結果、エラー一覧
 */
export const createUser = async (user: User): Promise<{ result: boolean; errors: Errors }> => {
  const res = await $axios.post('users', { user })
  const result = res.data.result === 'OK'
  const errors = res.data.errors

  return { result, errors }
}

/**
 * ユーザー更新
 * @param user ユーザー
 * @returns 結果、エラー一覧
 */
export const updateUser = async (user: User): Promise<{ result: boolean; errors: Errors }> => {
  const res = await $axios.put(`users/${user.id}`, { user })
  const result = res.data.result === 'OK'
  const errors = res.data.errors

  return { result, errors }
}

/**
 * ユーザー削除
 * @param id ID
 * @returns 結果
 */
export const deleteUser = async (id: number) => {
  const res = await $axios.delete(`users/${id}`)
  const result = res.data.result === 'OK'

  return result
}

/**
 * バリデート
 * @param user ユーザー
 * @returns 結果、エラー一覧
 */
export const validates = async (user: User) => {
  const res = await $axios.post('users/validates', { user })
  const result = res.data.result === 'OK'
  const errors = res.data.errors

  return { result, errors }
}

/**
 * CSVエクスポート
 * @returns レスポンスデータ
 */
export const csvExport = async () => {
  const res = await $axios.get('users/csv_export')
  const blob = new Blob([res.data], { type: 'text/csv' })
  saveAs(blob, 'users.csv')

  return res.data
}

/**
 * CSVインポート
 * @param csv CSVファイル
 * @returns レスポンスデータ
 */
export const csvImport = async (csv: File) => {
  const res = await $axios.post(
    'users/csv_import',
    { csv },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return res.data
}
