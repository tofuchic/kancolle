import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "router/pages/App";
import "styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
