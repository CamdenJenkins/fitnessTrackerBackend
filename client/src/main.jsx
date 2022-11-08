import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoutinesProvider from "./components/RoutinesProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutinesProvider>
        <App />
      </RoutinesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
