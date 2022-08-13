import { HashRouter, Link, useRoutes } from "react-router-dom";
import { Home } from "router/pages/Home";
import { AuthProvider } from "services/context/AuthProvider";
import Login from "./Login";

const RootRoutes = () => {
  return useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
  ]);
};

const App = () => {
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
        </ul>
      </nav>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
