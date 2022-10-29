import * as React from 'react'
import { HashRouter, Link, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/services/context/AuthProvider'

import { Home } from './Home'
import { Login } from './Login'
import { MikanDetails } from './MikanDetails'

const RootRoutes = (): JSX.Element | null => {
  return useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/mikan', element: <MikanDetails /> }
  ])
}

export const App: React.FunctionComponent = () => {
  return (
    <HashRouter basename="/">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/mikan?displayName=cut_fruit_orange,fruit_ao_mikan">
              Mikan
            </Link>
          </li>
        </ul>
      </nav>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </HashRouter>
  )
}
