import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
// import { AuthContextProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <UserProvider>
          <FormProvider>
            {/* <AuthContextProvider> */}
            <App />
            {/* </AuthContextProvider> */}
          </FormProvider>
        </UserProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
