import "./index.css";
import "./google-map.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { RouteContextProvider } from "./context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteContextProvider>
      <App />
    </RouteContextProvider>
  </React.StrictMode>,
);
