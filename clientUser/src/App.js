import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
// import LoginModal from "./pages/loginModal/LoginModal";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
// import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
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
