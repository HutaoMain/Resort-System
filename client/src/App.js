import { Routes, Route, useLocation, Link } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import Messenger from "./components/messenger/Messenger";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./pages/profile/Profile";
import { useUser } from "./context/UserContext";

function App() {
  const { user, login, logout } = useUser();

  const location = useLocation();

  useEffect(() => {
    async function retrieveUserData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/user`,
          {
            withCredentials: true,
          }
        );

        login(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    retrieveUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Messenger />
      {location.pathname !== "/login" ? (
        <Navbar user={user} logout={logout} />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login />}
          render={() => (user ? <Link to="/" /> : <Login />)}
        />
        <Route path="/rooms" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms/:id" element={<SinglePage />} />
      </Routes>
    </>
  );
}

export default App;
