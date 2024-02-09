import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { RouteContextProvider } from "./context.tsx";
import AddressManager from "./AddressManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteContextProvider>
      <App />
      <AddressManager />
    </RouteContextProvider>
  </React.StrictMode>,
);
