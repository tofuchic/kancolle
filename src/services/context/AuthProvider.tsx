import { createContext, useState, useContext, ReactNode } from "react";
import { auth } from "services/auth/firebase";
import {
  getRedirectResult,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User,
} from "firebase/auth";

type AuthContextType = {
  currentUser: User | null;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type Props = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo"); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
    return signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  const getAccessToken = () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo"); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
    getRedirectResult(auth)
      .then((result) => {
        console.debug(result);
        if (result && result.user) {
          const credential = GithubAuthProvider.credentialFromResult(result);
          console.debug(credential);
          if (credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = credential.accessToken;
            if (token) {
              console.debug("setToken");
              localStorage.setItem("githubAccessToken", token);
            }
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.error(errorCode);
        console.error(errorMessage);
        console.error(email);
        console.error(credential);
      });
  };

  onAuthStateChanged(auth, (user) => {
    console.debug(user);
    setCurrentUser(user);
    setIsLoading(false);
    getAccessToken();
    console.debug("onAuthStateChanged");
  });

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
