import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

function UserProvider(props) {
  const [user, setUser] = useState(null);

  function login(user) {
    setUser(user);
  }

  function logout() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
        document.cookie =
          "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
