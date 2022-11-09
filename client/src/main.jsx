import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoutinesProvider from "./components/RoutinesProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "purecss/build/pure.css";
import ActivitiesProvider from "./components/ActivitiesProvider";
import UsersProvider from "./components/UsersProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <ActivitiesProvider>
          <RoutinesProvider>
            <App />
          </RoutinesProvider>
        </ActivitiesProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);
