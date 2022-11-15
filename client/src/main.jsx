import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoutinesProvider from "./components/RoutinesProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "purecss/build/pure.css";
import ActivitiesProvider from "./components/ActivitiesProvider";
import UsersProvider from "./components/UsersProvider";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActivitiesProvider>
        <UsersProvider>
          <RoutinesProvider>
            <App />
          </RoutinesProvider>
        </UsersProvider>
      </ActivitiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
