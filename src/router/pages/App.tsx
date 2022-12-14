import React, { useState } from 'react'
import { styled, useTheme, createTheme } from '@mui/material/styles'
import { HashRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/services/context/AuthProvider'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

import { Home } from './Home'
import { Kanmi } from './Kanmi'
import { Login } from './Login'
import { MikanDetails } from './MikanDetails'
import { MikanTotal } from './MikanTotal'
import { ThemeProvider } from '@emotion/react'
import { auth } from '@/services/auth/firebase'

const drawerWidth = 280

const RootRoutes = (): React.ReactElement | null => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/kanmi', element: <Kanmi /> },
    { path: '/login', element: <Login /> },
    { path: '/mikan', element: <MikanDetails /> },
    { path: '/total', element: <MikanTotal /> },
  ])
}

const themeColor = createTheme({
  palette: {
    primary: {
      light: '#ffad32',
      main: '#ef7c1d',
      // main: '#ff9900',
      dark: '#e08600',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5CC13F',
      main: '#10873d',
      // main: '#35AC17',
      dark: '#2E8914',
      contrastText: '#fff',
    },
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const login_links = [
  { link: '#/', text: '?????????', icon: <HomeIcon /> },
  {
    link: '#/kanmi',
    text: '?????????????????????',
    icon: <CalendarMonthIcon />,
  },
  { link: '#/total', text: '??????????????????', icon: <PeopleAltIcon /> },
  { link: '#/login', text: '????????????', icon: <LoginIcon /> },
]

const logout_links = [
  { link: '#/', text: '?????????', icon: <HomeIcon /> },
  {
    link: '#/kanmi',
    text: '?????????????????????',
    icon: <CalendarMonthIcon />,
  },
  { link: '#/total', text: '??????????????????', icon: <PeopleAltIcon /> },
  { link: '#/login', text: '???????????????', icon: <LogoutIcon /> },
]

export const App: React.FunctionComponent = () => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  function handleDrawer(): void {
    setOpen(!open)
  }

  return (
    <HashRouter basename="/">
      <ThemeProvider theme={themeColor}>
        <Box sx={{ display: 'flex' }}>
          <MuiAppBar position="fixed" color="secondary">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" noWrap component="div">
                ?????????
              </Typography>
            </Toolbar>
          </MuiAppBar>
          <SwipeableDrawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#ef7c1d',
              },
            }}
            open={open}
            onClose={handleDrawer}
            onOpen={handleDrawer}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawer}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon sx={{ color: '#f0f0f0' }} />
                ) : (
                  <ChevronRightIcon sx={{ color: '#f0f0f0' }} />
                )}
              </IconButton>
            </DrawerHeader>
            <List sx={{ color: 'white' }}>
              {auth.currentUser != null && (
                <>
                  {logout_links.map((text, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton component="a" href={text.link}>
                        <ListItemIcon sx={{ color: '#f0f0f0', ml: '6px' }}>
                          {text.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text.text}
                          primaryTypographyProps={{
                            color: '#f0f0f0',
                            variant: 'subtitle1',
                            fontSize: '24px',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
              )}
              {auth.currentUser == null && (
                <>
                  {login_links.map((text, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton component="a" href={text.link}>
                        <ListItemIcon sx={{ color: '#f0f0f0', ml: '6px' }}>
                          {text.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text.text}
                          primaryTypographyProps={{
                            color: '#f0f0f0',
                            variant: 'subtitle1',
                            fontSize: '24px',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </SwipeableDrawer>
          <Box sx={{ width: '100%' }}>
            <DrawerHeader />
            <AuthProvider>
              <RootRoutes />
            </AuthProvider>
          </Box>
        </Box>
      </ThemeProvider>
    </HashRouter>
  )
}
