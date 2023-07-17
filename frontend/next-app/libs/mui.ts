import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      contrastText: '#fff'
    },
    secondary: {
      main: '#65b2c6',
      contrastText: '#fff'
    },
    background: {
      default: '#f3f3f3',
      paper: '#fff'
    }
  }
})

export default theme
