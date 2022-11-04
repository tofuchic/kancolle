import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { HashRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/services/context/AuthProvider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Home } from './Home'
import { Login } from './Login'
import { MikanDetails } from './MikanDetails'
import { MikanTotal } from './MikanTotal'

const drawerWidth = 240

const RootRoutes = (): React.ReactElement | null => {
  return useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/mikan', element: <MikanDetails /> },
    { path: '/total', element: <MikanTotal /> },
  ])
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const links = [
  { link: '#/home', text: 'Home' },
  { link: '#/login', text: 'Login' },
  {
    link: '#/mikan?displayName=cut_fruit_orange,fruit_ao_mikan',
    text: '11月のみかん',
  },
  { link: '#/total', text: 'みんなの評価' },
]

export const App: React.FunctionComponent = () => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  function handleDrawerOpen(): void {
    setOpen(true)
  }

  function handleDrawerClose(): void {
    setOpen(false)
  }

  return (
    <HashRouter basename="/">
      {/* <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/mikan?displayName=cut_fruit_orange,fruit_ao_mikan">
              n月のみかん（サンプル）
            </Link>
          </li> */}
      {/* DBにデータを入れてから */}
      {/* <li>
            <Link to="/mikan?displayName=taguchiwase,kimurawase,orogurosu,yamashitabeniwase,kanjukuyurawase,amakusa,benimadonna">
              11月のみかん
            </Link>
          </li> */}
      {/* <li>
            <Link to="/total">みんなの評価（イメージ図）</Link>
          </li>
        </ul>
      </nav>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider> */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {links.map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a" href={text.link}>
                  <ListItemIcon>い</ListItemIcon>
                  <ListItemText primary={text.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <RootRoutes />
        </Main>

        {/* <AuthProvider>

        </AuthProvider> */}
      </Box>
    </HashRouter>
  )
}
