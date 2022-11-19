import { useAuth } from '@/services/context/AuthProvider'
import '@/styles/App.css'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button } from '@mui/material'

export const Login = (): React.ReactElement => {
  const { currentUser, login, logout } = useAuth()

  return (
    <div className="App">
      <div>
        {currentUser == null && (
          <Button variant="contained" onClick={login}>
            <TwitterIcon style={{ color: '#1DA1F2' }} />
            Twitterでログイン
          </Button>
        )}
        {currentUser != null && (
          <div>
            {currentUser.photoURL != null && (
              <img className="icon" src={currentUser.photoURL} />
            )}
            <p>{currentUser.displayName}としてログイン中</p>
            <Button variant="contained" onClick={logout}>
              ログアウト
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
