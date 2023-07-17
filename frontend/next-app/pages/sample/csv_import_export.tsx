import { useEffect, useState } from 'react'
import { csvExport, csvImport, getUsers } from '@/api/v1/users'
import Breadcrumbs from '@/components/breadcrumbs'
import { FileInput } from '@/components/form'
import Paper from '@/components/paper'
import { CrudTable } from '@/components/table'
import type { Col, PaginationModel, Row, SortModel } from '@/components/table/crudTable'
import { yupResolver } from '@hookform/resolvers/yup'
import { Download, Upload } from '@mui/icons-material'
import { Box, Button, FormGroup, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'CSV Import Export', link: '/sample/csvImportExport' }
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
interface FormInput {
  csvFile: File
}

// バリデーションルール
const schema = Yup.object({
  csvFile: Yup.mixed<File>()
    .required('ファイルが選択されていません')
    .test('csv-require', 'CSVファイル指定してください', (value) => value.type === 'text/csv')
})

export default function CsvImportExport() {
  const [rows, setRows] = useState<Row[]>([])
  const [rowCount, setRowCount] = useState<number>(0)
  const [sortModel, setSortModel] = useState<SortModel>([])
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 10 })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortModel, paginationModel])

  // ユーザー一覧取得
  const loadUsers = async () => {
    setLoading(true)
    const page = paginationModel.page + 1
    const pageSize = paginationModel.pageSize
    const field = sortModel[0]?.field
    const order = sortModel[0]?.sort
    const sort = field && order ? { [field]: order } : undefined

    const { users, count } = await getUsers(undefined, page, pageSize, sort)

    setRows(users.map((item) => ({ ...item, name: `${item.lastName} ${item.firstName}` })))
    setRowCount(count)
    setLoading(false)
  }

  // useForm
  const { control, handleSubmit } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema)
  })

  // エクスポートボタンハンドラ
  const handleClickExport = async () => {
    await csvExport()
  }

  // インポートボタンハンドラ
  const handleClickImport: SubmitHandler<FormInput> = async (data) => {
    const res = await csvImport(data.csvFile)

    if (res.result === 'OK') {
      // await loadUsers()
      toast.success('登録が完了しました。')
    } else {
      toast.error(res.message[0])
    }
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Paper>
        <Stack spacing={2}>
          <FormGroup row>
            <Box sx={{ flexGrow: 1 }}>
              <FileInput control={control} name="csvFile" label="csvファイル" accept=".csv" width="100%" />
            </Box>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<Upload />}
              onClick={handleSubmit(handleClickImport)}
              sx={{ width: 180, ml: 1 }}
            >
              CSV インポート
            </Button>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<Download />}
              onClick={handleClickExport}
              sx={{ width: 180, ml: 1 }}
            >
              CSV エクスポート
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
          />
        </Stack>
      </Paper>
    </>
  )
}
