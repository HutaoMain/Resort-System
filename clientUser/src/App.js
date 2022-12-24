import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import Messenger from "./components/messenger/Messenger";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";

function App() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  return (
    <>
      <Messenger />
      {location.pathname !== "/login" ? <Navbar user={user} /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<List />} />
        <Route path="/rooms/:id" element={<SinglePage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
