import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import useCurrentUser from '@/hooks/useUser'
import AccountMenu from './accountMenu'

type Props = {
  title: string
  handleHamburgerMenu: () => void
}

export default function Header({ title, handleHamburgerMenu }: Props) {
  // 現在のユーザー
  const currentUser = useCurrentUser()

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleHamburgerMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {currentUser && <AccountMenu userName={`${currentUser.lastName} ${currentUser.firstName}`} />}
      </Toolbar>
    </AppBar>
  )
}
