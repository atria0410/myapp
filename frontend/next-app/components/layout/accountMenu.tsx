import { useRouter } from 'next/router'
import { Typography, IconButton, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { logOut } from '@/api/v1/sessions'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

type Props = {
  userName: string
}

export default function AccountMenu({ userName }: Props) {
  // ルーター
  const router = useRouter()

  // ログアウト
  const handleLogOut = async () => {
    const result = await logOut()
    if (result) {
      router.push('/logIn')
    }
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account of current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            {...bindTrigger(popupState)}
          >
            <AccountCircleIcon />
            <Typography sx={{ ml: 1 }}>{userName}</Typography>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">プロフィール</Typography>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">設定</Typography>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">ヘルプ</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">ログアウト</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  )
}
