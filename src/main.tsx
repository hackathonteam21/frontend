import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import AddressManager from "./AddressManager.tsx";
import App from "./App.tsx";
import { RouteContextProvider } from "./context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteContextProvider>
      <App />
      <AddressManager />
    </RouteContextProvider>
  </React.StrictMode>,
);
