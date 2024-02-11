import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { SearchPage } from "@/search";

import App from "./App.tsx";
import { RouteContextProvider } from "./context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouteContextProvider>
      <App />
      <SearchPage />
    </RouteContextProvider>
  </React.StrictMode>,
);
