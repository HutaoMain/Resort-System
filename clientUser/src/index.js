import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
