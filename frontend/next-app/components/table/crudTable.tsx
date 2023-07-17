import { useState } from 'react'
import Pagination from './pagination'
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { Button } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
  jaJP
} from '@mui/x-data-grid'
import type {
  GridColDef as Col,
  GridCallbackDetails,
  GridEventListener,
  GridRowId,
  GridRowModesModel,
  GridPaginationModel as PaginationModel,
  GridPreProcessEditCellProps as PreProcessEditCellProps,
  GridRowModel as Row,
  GridSortModel as SortModel
} from '@mui/x-data-grid'

// 型定義
type HandleSortModelChange = (model: SortModel, details: GridCallbackDetails<any>) => void
type HandlePaginationModelChange = (model: PaginationModel, details: GridCallbackDetails<any>) => void
type HandleAdd = () => Row
type HandleCreate = (newRow: Row) => void
type HandleUpdate = (newRow: Row) => void
type HandleDelete = (id: GridRowId) => void
type HandleCancel = (id: GridRowId) => void
type HandleClickRow = GridEventListener<'rowClick'>

export type {
  Col,
  Row,
  SortModel,
  PaginationModel,
  HandleAdd,
  HandleCreate,
  HandleUpdate,
  HandleDelete,
  HandleCancel,
  HandleClickRow,
  PreProcessEditCellProps
}

type Props = {
  columns: Col[]
  rows: Row[]
  rowCount: number
  loading?: boolean
  sortModel?: SortModel
  paginationModel?: PaginationModel
  reedOnly?: boolean
  handleSortModelChange?: HandleSortModelChange
  handlePaginationModelChange?: HandlePaginationModelChange
  handleAdd?: HandleAdd
  handleCreate?: HandleCreate
  handleUpdate?: HandleUpdate
  handleDelete?: HandleDelete
  handleCancel?: HandleCancel
  handleClickRow?: HandleClickRow
}

export default function CrudTable({
  columns,
  rows,
  rowCount,
  loading,
  sortModel,
  paginationModel,
  reedOnly,
  handleSortModelChange,
  handlePaginationModelChange,
  handleAdd,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleCancel,
  handleClickRow
}: Props) {
  // 行モデル
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  // 行モデル変更ハンドラ
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  // 追加ボタンハンドラ
  const handleAddClick = () => {
    if (!handleAdd) return

    const newRows = rows.filter((row) => row.isNew)
    if (newRows.length > 0) return

    const firstEditableColumn = columns.find((column) => column.editable)
    const addedRow = handleAdd()
    addedRow.isNew = true

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [addedRow.id]: { mode: GridRowModes.Edit, fieldToFocus: firstEditableColumn?.field }
    }))
  }

  // 編集ボタンハンドラ
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  // 削除ボタンハンドラ
  const handleDeleteClick = (id: GridRowId) => () => {
    if (handleDelete) handleDelete(id)
  }

  // 保存ボタンハンドラ
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  // キャンセルボタンハンドラ
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })
    if (handleCancel) handleCancel(id)
  }

  // 編集終了ハンドラ
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  // 保存処理
  const processRowUpdate = (newRow: Row) => {
    if (newRow.isNew) {
      delete newRow.isNew
      if (handleCreate) handleCreate(newRow)
    } else {
      delete newRow.isNew
      if (handleUpdate) handleUpdate(newRow)
    }
    return newRow
  }

  // ヘッダー
  const actionColumns: Col[] = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: '操作',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem key={1} icon={<Save color="primary" />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem key={2} icon={<Cancel />} label="Cancel" onClick={handleCancelClick(id)} />
          ]
        } else {
          return [
            <GridActionsCellItem key={1} icon={<Edit />} label="Edit" onClick={handleEditClick(id)} />,
            <GridActionsCellItem key={2} icon={<Delete />} label="Delete" onClick={handleDeleteClick(id)} />
          ]
        }
      }
    }
  ]

  // ツールバー
  function Toolbar() {
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<Add />} onClick={handleAddClick}>
          データを追加する
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <DataGrid
      editMode="row"
      paginationMode="server"
      columns={reedOnly ? columns : actionColumns}
      rows={rows}
      rowCount={rowCount}
      loading={loading}
      rowModesModel={rowModesModel}
      sortModel={sortModel}
      paginationModel={paginationModel}
      showColumnVerticalBorder={true}
      showCellVerticalBorder={true}
      disableColumnMenu={true}
      disableRowSelectionOnClick={true}
      columnHeaderHeight={48}
      rowHeight={48}
      onRowClick={handleClickRow}
      onRowModesModelChange={handleRowModesModelChange}
      onSortModelChange={handleSortModelChange}
      onPaginationModelChange={handlePaginationModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      sx={{
        '.MuiDataGrid-columnHeaders': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText'
        }
      }}
      slots={{
        toolbar: reedOnly ? null : Toolbar,
        loadingOverlay: LinearProgress,
        pagination: Pagination
      }}
      localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
    />
  )
}
