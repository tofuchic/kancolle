import React, { useState, useEffect } from 'react'
import { styled, useTheme, createTheme } from '@mui/material/styles'
import { HashRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/services/context/AuthProvider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
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
import ViewListIcon from '@mui/icons-material/ViewList'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

import { Home } from './Home'
import { Login } from './Login'
import { MikanDetails } from './MikanDetails'
import { MikanTotal } from './MikanTotal'
import { ThemeProvider } from '@emotion/react'

const drawerWidth = 280

const RootRoutes = (): React.ReactElement | null => {
  return useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/mikan', element: <MikanDetails /> },
    { path: '/total', element: <MikanTotal /> },
  ])
}

const themeColor = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#ef6c00',
      dark: '#ba000d',
    },
  },
})

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
  { link: '#/home', text: 'Home', icon: <HomeIcon /> },
  { link: '#/login', text: 'Login', icon: <LoginIcon /> },
  {
    link: '#/mikan?displayName=cut_fruit_orange,fruit_ao_mikan',
    text: 'n月のみかん（サンプル）',
    icon: <ViewListIcon />,
  },
  { link: '#/total', text: 'みんなの評価', icon: <PeopleAltIcon /> },
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
          <CssBaseline />
          <AppBar position="fixed" open={open} color="primary">
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
                柑これ
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
            color="primary"
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawer}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <List>
              {links.map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component="a" href={text.link}>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText
                      primary={text.text}
                      primaryTypographyProps={{
                        variant: 'subtitle1',
                        mt: '5px',
                        mb: '5px',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <AuthProvider>
              <RootRoutes />
            </AuthProvider>
          </Main>
        </Box>
      </ThemeProvider>
    </HashRouter>
  )
}
