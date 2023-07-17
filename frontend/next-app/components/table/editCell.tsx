import { styled } from '@mui/material/styles'
import { Box, Tooltip, tooltipClasses } from '@mui/material'
import type { TooltipProps } from '@mui/material'
import { GridEditInputCell } from '@mui/x-data-grid'
import type { GridRenderEditCellParams } from '@mui/x-data-grid'

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.error.main
  }
}))

export default function EditCell(props: GridRenderEditCellParams) {
  const { error, message } = props

  return (
    <ErrorTooltip open={error} title={message}>
      <Box>
        <GridEditInputCell {...props} />
      </Box>
    </ErrorTooltip>
  )
}
