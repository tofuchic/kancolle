import { useAuth } from '@/services/context/AuthProvider'
import '@/styles/App.css'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button, Box, Container, Typography } from '@mui/material'

export const Login = (): React.ReactElement => {
  const { currentUser, login, logout } = useAuth()

  return (
    <div className="App">
      <Container>
        <Box sx={{ m: 3 }}>
          {currentUser == null && (
            <Button variant="contained" onClick={login}>
              <TwitterIcon style={{ color: '#1DA1F2' }} />
              <Typography variant={'body1'}>Twitterでログイン</Typography>
            </Button>
          )}
          {currentUser != null && (
            <div>
              {currentUser.photoURL != null && (
                <img className="icon" src={currentUser.photoURL} />
              )}
              <Typography sx={{ my: 3 }} variant={'body1'}>
                {currentUser.displayName}としてログイン中
              </Typography>
              <Button variant="contained" onClick={logout}>
                <Typography variant={'body1'}>ログアウト</Typography>
              </Button>
            </div>
          )}
        </Box>
      </Container>
    </div>
  )
}

export default Login
