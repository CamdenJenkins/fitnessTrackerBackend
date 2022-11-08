import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoutinesProvider from "./components/RoutinesProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ActivitiesProvider from "./components/ActivitiesProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActivitiesProvider>
        <RoutinesProvider>
          <App />
        </RoutinesProvider>
      </ActivitiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
