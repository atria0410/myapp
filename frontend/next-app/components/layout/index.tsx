import { useState, ReactNode } from 'react'
import { Box, Toolbar } from '@mui/material'
import Header from './header'
import SideMenu from './sideMenu'
import useCurrentUser from '@/hooks/useUser'

const title = 'Next.js'
const menus = [
  { text: 'Home', link: '/', icon: 'home' },
  { text: 'Sample', link: '/sample', icon: 'code' }
]

export default function Layout({ children }: { children?: ReactNode }) {
  // 現在のユーザー
  const currentUser = useCurrentUser()

  const [sideMenuOpen, setSideMenuOpen] = useState(true)

  const handleHamburgerMenu = () => {
    setSideMenuOpen(!sideMenuOpen)
  }

  return (
    <>
      {currentUser ? (
        // ログイン時
        <Box sx={{ display: 'flex' }}>
          <Header title={title} handleHamburgerMenu={handleHamburgerMenu} />
          <SideMenu open={sideMenuOpen} menus={menus} />
          <Box component="main" sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      ) : (
        // 未ログイン時
        <Box sx={{ display: 'flex' }}>
          <Box component="main" sx={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </Box>
        </Box>
      )}
    </>
  )
}
