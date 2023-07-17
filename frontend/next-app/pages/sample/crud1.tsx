import { useEffect, useState } from 'react'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '@/api/v1/users'
import Breadcrumbs from '@/components/breadcrumbs'
import CrudForm from '@/components/crudForm'
import { EmailField, HiddenField, PasswordField, TextField } from '@/components/form'
import Loading from '@/components/loading'
import Paper from '@/components/paper'
import Search from '@/components/search'
import { CrudTable } from '@/components/table'
import type { Col, HandleClickRow, PaginationModel, Row, SortModel } from '@/components/table/crudTable'
import type { User } from '@/types'
import { Add } from '@mui/icons-material'
import { Box, Button, FormGroup, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'CRUD 1', link: '/sample/crud1' }
]

// カラム定義
const columns: Col[] = [
  { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', width: 70 },
  { field: 'name', headerName: '名前', headerAlign: 'center', align: 'left', flex: 1 },
  { field: 'email', headerName: 'メールアドレス', headerAlign: 'center', align: 'left', flex: 1 },
  { field: 'createdAt', headerName: '作成日', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'updatedAt', headerName: '更新日', headerAlign: 'center', align: 'center', width: 200 }
]

// フォーム項目型
interface UserForm {
  id: number | null
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
  lockVersion: number
}

export default function Crud1() {
  const { control, watch, setValue, handleSubmit, setError, clearErrors } = useForm<UserForm>()
  const id = watch('id')

  const [rows, setRows] = useState<Row[]>([])
  const [rowCount, setRowCount] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [sortModel, setSortModel] = useState<SortModel>([])
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 10 })
  const [loading, setLoading] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [loadingDialog, setLoadingDialog] = useState<boolean>(false)

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortModel, paginationModel])

  // ユーザー一覧取得
  const loadUsers = async () => {
    setLoading(true)
    const page = paginationModel.page + 1
    const pageSize = paginationModel.pageSize
    const field = sortModel[0]?.field
    const order = sortModel[0]?.sort
    const sort = field && order ? { [field]: order } : undefined

    const { users, count } = await getUsers(search, page, pageSize, sort)

    setRows(users.map((item) => ({ ...item, name: `${item.lastName} ${item.firstName}` })))
    setRowCount(count)
    setLoading(false)
  }

  // 追加ボタンクリック
  const handleClickAdd = () => {
    setValue('id', null)
    setValue('firstName', '')
    setValue('lastName', '')
    setValue('email', '')
    setValue('password', '')
    setValue('passwordConfirmation', '')
    setOpenForm(true)
  }

  // テーブル行クリック
  const handleClickRow: HandleClickRow = async (params) => {
    const user = await getUser(params.id as number)
    setValue('id', user.id)
    setValue('firstName', user.firstName)
    setValue('lastName', user.lastName)
    setValue('email', user.email)
    setValue('password', '')
    setValue('passwordConfirmation', '')
    setValue('lockVersion', user.lockVersion)
    setOpenForm(true)
  }

  // 登録・更新ダイアログを閉じる
  const closeFrom = () => {
    setOpenForm(false)
    clearErrors()
  }

  // 登録
  const onSubmitRegister: SubmitHandler<UserForm> = async ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  }) => {
    setLoadingDialog(true)

    const { result, errors } = await createUser({ firstName, lastName, email, password, passwordConfirmation } as User)

    if (result) {
      toast.success('登録が完了しました')
      closeFrom()
      loadUsers()
    } else {
      for (const [key, messages] of Object.entries(errors)) {
        setError(key as keyof UserForm, { message: messages[0] })
      }
    }

    setLoadingDialog(false)
  }

  // 更新
  const onSubmitUpdate: SubmitHandler<UserForm> = async ({
    id,
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    lockVersion
  }) => {
    setLoadingDialog(true)

    const { result, errors } = await updateUser({
      id,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      lockVersion
    } as User)

    if (result) {
      toast.success('更新が完了しました')
      closeFrom()
      loadUsers()
    } else {
      for (const [key, messages] of Object.entries(errors)) {
        setError(key as keyof UserForm, { message: messages[0] })
      }
    }

    setLoadingDialog(false)
  }

  // 削除
  const onSubmitDelete = async () => {
    setLoadingDialog(true)

    const result = await deleteUser(id!)

    if (result) {
      toast.success('削除が完了しました')
      closeFrom()
      loadUsers()
    } else {
      toast.error('削除に失敗しました')
    }

    setLoadingDialog(false)
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Paper>
        <Stack spacing={2}>
          <FormGroup row>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <Search value={search} onChange={(event) => setSearch(event.target.value)} width="100%" />
            </Box>
            <Button color="primary" variant="outlined" startIcon={<Add />} onClick={handleClickAdd}>
              データを追加する
            </Button>
          </FormGroup>

          <CrudTable
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            loading={loading}
            sortModel={sortModel}
            paginationModel={paginationModel}
            reedOnly={true}
            handleSortModelChange={(model) => setSortModel(model)}
            handlePaginationModelChange={(model) => setPaginationModel(model)}
            handleClickRow={handleClickRow}
          />
        </Stack>
      </Paper>

      <CrudForm
        open={openForm}
        mode={id === null ? 'new' : 'edit'}
        onClickCreate={handleSubmit(onSubmitRegister)}
        onClickUpdate={handleSubmit(onSubmitUpdate)}
        onClickDelete={onSubmitDelete}
        onClickCancel={closeFrom}
      >
        <Stack spacing={5}>
          <HiddenField control={control} name="id" />
          <Stack direction="row" spacing={2}>
            <TextField control={control} name="lastName" label="苗字" />
            <TextField control={control} name="firstName" label="名前" />
          </Stack>
          <EmailField control={control} name="email" label="メールアドレス" />
          <PasswordField control={control} name="password" label="パスワード" />
          <PasswordField control={control} name="passwordConfirmation" label="パスワード（確認）" />
        </Stack>
      </CrudForm>

      <Loading open={loadingDialog} />
    </>
  )
}
