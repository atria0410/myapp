import { Pagination as MuiPagination } from '@mui/material'
import {
  useGridApiContext,
  useGridSelector,
  gridRowCountSelector,
  gridPageSizeSelector,
  gridPageSelector
} from '@mui/x-data-grid'

export default function Pagination() {
  const apiRef = useGridApiContext()
  const rowCount = useGridSelector(apiRef, gridRowCountSelector)
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector)
  const page = useGridSelector(apiRef, gridPageSelector) + 1
  const count = Math.ceil(rowCount / pageSize)

  return (
    <>
      <MuiPagination
        color="primary"
        count={count}
        page={page}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        showFirstButton
        showLastButton
        shape="rounded"
      />
    </>
  )
}
