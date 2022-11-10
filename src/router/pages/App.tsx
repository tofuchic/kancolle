import * as React from 'react'
import { HashRouter, Link, useRoutes } from 'react-router-dom'
import { AuthProvider } from '@/services/context/AuthProvider'

import { Home } from './Home'
import { Login } from './Login'
import { MikanDetails } from './MikanDetails'
import { MikanTotal } from './MikanTotal'

const RootRoutes = (): React.ReactElement | null => {
  return useRoutes([
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/mikan', element: <MikanDetails /> },
    { path: '/total', element: <MikanTotal /> },
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
              n月のみかん（サンプル）
            </Link>
          </li>
          {/* DBにデータを入れてから */}
          {/* <li>
            <Link to="/mikan?displayName=taguchiwase,kimurawase,orogurosu,yamashitabeniwase,kanjukuyurawase,amakusa,benimadonna">
              11月のみかん
            </Link>
          </li> */}
          <li>
            <Link to="/total">みんなの評価（イメージ図）</Link>
          </li>
        </ul>
      </nav>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </HashRouter>
  )
}
