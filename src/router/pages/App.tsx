import { BrowserRouter, useRoutes } from "react-router-dom";
import { Home } from "router/pages/Home";
import { AuthProvider } from "services/context/AuthProvider";
import Login from "./Login";

const RootRoutes = () => {
  return useRoutes([
    { path: "/scoooool", element: <Home /> },
    { path: "/scoooool/login", element: <Login /> },
  ]);
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
