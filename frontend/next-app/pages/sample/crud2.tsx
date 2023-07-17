import { useEffect, useState } from 'react'
import { createUser, deleteUser, getUsers, updateUser, validates } from '@/api/v1/users'
import Breadcrumbs from '@/components/breadcrumbs'
import Paper from '@/components/paper'
import Search from '@/components/search'
import { CrudTable, EditCell } from '@/components/table'
import type {
  Col,
  HandleAdd,
  HandleCancel,
  HandleCreate,
  HandleDelete,
  HandleUpdate,
  PaginationModel,
  PreProcessEditCellProps,
  Row,
  SortModel
} from '@/components/table/crudTable'
import type { User } from '@/types'
import { Stack } from '@mui/material'
import * as yup from 'yup'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'CRUD 2', link: '/sample/crud2' }
]

// バリデーション（名前）
const validateFirstName = async (params: PreProcessEditCellProps) => {
  const { errors } = await validates({ ...params.row, firstName: params.props.value })
  const message = errors.firstName?.[0]
  const error = message !== undefined
  return { ...params.props, error, message }
}

// バリデーション（苗字）
const validateLastName = async (params: PreProcessEditCellProps) => {
  const { errors } = await validates({ ...params.row, lastName: params.props.value })
  const message = errors.lastName?.[0]
  const error = message !== undefined
  return { ...params.props, error, message }
}

// バリデーション（メールアドレス）
const validateEmail = async (params: PreProcessEditCellProps) => {
  const { errors } = await validates({ ...params.row, email: params.props.value })
  const message = errors.email?.[0]
  const error = message !== undefined
  return { ...params.props, error, message }
}

const columns: Col[] = [
  { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
  {
    field: 'lastName',
    headerName: '苗字',
    width: 200,
    headerAlign: 'center',
    align: 'left',
    editable: true,
    preProcessEditCellProps: validateLastName,
    renderEditCell: EditCell
  },
  {
    field: 'firstName',
    headerName: '名前',
    width: 200,
    headerAlign: 'center',
    align: 'left',
    editable: true,
    preProcessEditCellProps: validateFirstName,
    renderEditCell: EditCell
  },
  {
    field: 'email',
    headerName: 'メールアドレス',
    flex: 1,
    headerAlign: 'center',
    align: 'left',
    editable: true,
    preProcessEditCellProps: validateEmail,
    renderEditCell: EditCell
  },
  { field: 'createdAt', headerName: '作成日', width: 200, headerAlign: 'center', align: 'center' },
  { field: 'updatedAt', headerName: '更新日', width: 200, headerAlign: 'center', align: 'center' }
]

export default function Crud2() {
  const [rows, setRows] = useState<Row[]>([])
  const [rowCount, setRowCount] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const [sortModel, setSortModel] = useState<SortModel>([])
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 10 })
  const [loading, setLoading] = useState<boolean>(false)

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
    setRows(users)
    setRowCount(count)
    setLoading(false)
  }

  // 追加
  const handleAdd: HandleAdd = () => {
    const newRow = { id: 'new', firstName: '', lastName: '', email: '' }
    setRows((oldRows) => [newRow, ...oldRows])
    return newRow
  }

  // 登録
  const handleCreate: HandleCreate = async (newRow) => {
    const defaultPassword = 'password'
    await createUser({ ...newRow, password: defaultPassword } as User)
    await loadUsers()
  }

  // 更新
  const handleUpdate: HandleUpdate = async (newRow) => {
    await updateUser(newRow as User)
    await loadUsers()
  }

  // 削除
  const handleDelete: HandleDelete = async (id) => {
    await deleteUser(id as number)
    await loadUsers()
  }

  // キャンセル
  const handleCancel: HandleCancel = (id) => {
    if (id === 'new') {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Paper>
        <Stack spacing={2}>
          <Search value={search} onChange={(event) => setSearch(event.target.value)} width="100%" />
          <CrudTable
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            loading={loading}
            sortModel={sortModel}
            paginationModel={paginationModel}
            handleSortModelChange={(model) => setSortModel(model)}
            handlePaginationModelChange={(model) => setPaginationModel(model)}
            handleAdd={handleAdd}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        </Stack>
      </Paper>
    </>
  )
}
