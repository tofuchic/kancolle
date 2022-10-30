import { useAuth } from '@/services/context/AuthProvider'
import '@/styles/App.css'

export const Login = (): JSX.Element => {
  const { currentUser, login, logout } = useAuth()

  return (
    <div className="App">
      <h1>Login</h1>
      <div>
        {currentUser == null && <button onClick={login}>Twitter Login</button>}
        {currentUser != null && (
          <div>
            <div>
              <p>currentUser.email: {currentUser.email}</p>
              <p>currentUser.displayName: {currentUser.displayName}</p>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
