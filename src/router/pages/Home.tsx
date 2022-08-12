import { useState, useEffect } from "react";
import logo from "logo.svg";
import "App.css";
import "firebaseApp";
import {
  getAuth,
  Auth,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const Home = () => {
  const OWNER = "tofuchic";
  const REPO = "scoooool";

  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);

  // GitHub OAuth Provider ObjectのInstanceを作成
  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope("repo"); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
      setProvider(newProvider);
    }
  }, [provider]);

  // Firebase Appに対するAuth instanceを取得
  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth());
      console.debug(auth);
    }
  }, [auth, provider]);

  // ポップアップによるサインインを実施し、成功したらアクセストークンを取得する
  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
          console.debug("token: " + credential.accessToken);
        }
        console.debug(result.user);
      });
    }
  }, [auth, provider, token]);

  // アクセストークンを使用してGitHub API（GET /Issues）へリクエストする
  useEffect(() => {
    if (token !== null) {
      fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application / vnd.github.v3 + json",
        },
      }).then((result) => {
        result.json().then((result) => {
          console.debug(result);
        });
      });
    }
  }, [token]);

  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};
