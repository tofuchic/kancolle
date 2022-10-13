import { useAuth } from "services/context/AuthProvider";
import "styles/App.css";

const Login = () => {
  const { currentUser, login, logout } = useAuth();

  const OWNER = "tofuchic";
  const REPO = "kancolle";

  // アクセストークンを使用してGitHub API（GET /Issues）へリクエストする
  const requestGetApi = (token: string | null) => {
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
  };

  return (
    <div className="App">
      <h1>Login with GitHub</h1>
      <div>
        {!currentUser && <button onClick={login}>Login</button>}
        {currentUser && (
          <div>
            <div>
              <p>currentUser.email: {currentUser.email}</p>
              <p>currentUser.displayName: {currentUser.displayName}</p>
              <p>
                githubAccessToken: {localStorage.getItem("githubAccessToken")}
              </p>
              <button onClick={logout}>Logout</button>
            </div>
            <div>
              <button
                onClick={() =>
                  requestGetApi(localStorage.getItem("githubAccessToken"))
                }
              >
                Get issues from https://github.com/{OWNER}/{REPO} (look at the
                console)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
