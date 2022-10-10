import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import Messenger from "./components/messenger/Messenger";

function App() {
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch("https://api.johnmikoresort.store/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <>
      <Messenger />
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<List />} />
        <Route path="/services/:id" element={<SinglePage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
