import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { auth } from '@/services/auth/firebase'
import {
  getRedirectResult,
  TwitterAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User,
} from 'firebase/auth'

interface AuthContextType {
  currentUser: User | null
  login?: () => Promise<void>
  logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
})

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}

interface Props {
  children?: ReactNode
}

export const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (): Promise<never> => {
    const provider = new TwitterAuthProvider()
    return await signInWithRedirect(auth, provider)
  }

  const logout = async (): Promise<void> => {
    localStorage.clear()
    return await auth.signOut()
  }

  const getAccessToken = async (): Promise<void> => {
    getRedirectResult(auth)
      .then((result) => {
        console.debug(result)
        if (result?.user != null) {
          const credential = TwitterAuthProvider.credentialFromResult(result)
          console.debug(credential)
          if (credential != null) {
            // This gives you a Twitter Access Token. You can use it to access the Twitter API.
            const token = credential.accessToken
            if (token != null) {
              console.debug('setToken')
              localStorage.setItem('twitterAccessToken', token)
            }
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error)
        console.error(errorCode)
        console.error(errorMessage)
        console.error(email)
        console.error(credential)
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.debug(user)
      setCurrentUser(user)
      setIsLoading(false)
      void getAccessToken()
      console.debug('onAuthStateChanged')
    })
  }, [])

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
