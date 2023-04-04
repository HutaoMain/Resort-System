import { Routes, Route, useLocation, Link } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import Messenger from "./components/messenger/Messenger";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UrlPath } from "./UrlPath";
import { useUser } from "./context/UserContext";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/AuthContext";
// import ProgressBarMain from "./components/progressBar/ProgressBarMain";

function App() {
  // const { user, login, logout } = useUser();

  const [user, setUser] = useState(null);

  const location = useLocation();

  // useEffect(() => {
  //   function retrieveUserData() {
  //     const token = localStorage.getItem("jwt_token");
  //     return axios.get(`${UrlPath}/auth/user`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //   }
  //   retrieveUserData()
  //     .then((response) => {
  //       const userData = response.data.user;
  //       login(userData);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    async function retrieveUserData() {
      try {
        const response = await axios.get(`${UrlPath}/auth/login/success`, {
          withCredentials: true,
        });

        console.log(response);

        // const userData = response.data.user;

        // const userEmail = localStorage.getItem("userEmail");

        // if (!userEmail) {
        //   localStorage.setItem("userEmail", JSON.stringify(userData?.email));
        // }

        // login(userData);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    retrieveUserData();
    // eslint-disable-next-line
  }, []);

  // const { dispatch } = useContext(AuthContext);

  // useEffect(() => {
  //   fetch(`${UrlPath}/auth/login/success`)
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .then((data) => dispatch({ type: "LOGIN_SUCCESS", payload: data }))
  //     .catch((err) => console.log(err));
  //   // eslint-disable-next-line
  // }, []);

  return (
    <>
      <Messenger />
      {location.pathname !== "/login" ? <Navbar user={user} /> : null}
      {/* {location.pathname !== "/" && location.pathname !== "/login" ? (
        <ProgressBarMain />
      ) : null} */}
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
