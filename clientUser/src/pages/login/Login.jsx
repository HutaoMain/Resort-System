import "./Login.css";
// import loginImg from "../../images/login.png";
// import { AuthContext } from "../../context/AuthContext";
import FbLoginComponent from "./fbLoginComponent/FbLogin";
import resortLogo from "../../images/resortLogo.png";
import loginAbstract from "../../images/loginAbstract.jpg";

// import { Link } from "react-router-dom";

// import { Google } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import jwtDecode from "jwt-decode";
// useNavigate
// useContext
// import { useState } from "react";
import GoogleLogin from "./googleLoginComponent/GoogleLogin";
import Modal from "react-modal";
import Register from "./registration/Register";
import { useState } from "react";
import { UrlPath } from "../../UrlPath";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "60%",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    overflow: "hidden",
  },
};

const Login = () => {
  // const navigate = useNavigate();
  // const { dispatch } = useContext(AuthContext);

  // const [checkbox, setCheckbox] = useState(false);

  // const toggleCheck = () => {
  //   setCheckbox(!checkbox);
  // };

  // const handleResponse = (response) => {
  //   var userObject = jwtDecode(response.credential);
  //   dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
  //   navigate("/", { replace: true });
  // };

  // const handleGoogleLogin = () => {
  //   try {
  //     window.google.accounts.id.initialize({
  //       client_id:
  //         "442836680666-5ojvaini79uu44rdneffm1l8crl4nse5.apps.googleusercontent.com",
  //       callback: handleResponse,
  //     });
  //     window.google.accounts.id.prompt((notification) => {
  //       if (notification.isNotDisplayed()) {
  //         throw new Error("Try to clear the cookies or try again later!");
  //       }
  //       if (
  //         notification.isSkippedMoment() ||
  //         notification.isDismissedMoment()
  //       ) {
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { login } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${UrlPath}/auth/login`, credentials);
      if (res.status === 200) {
        const user = { ...credentials };
        login(user);
        navigate("/");
      } else {
        console.log("not logged in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          {/* <span className="login-logo-text">Ali Trip Resort</span> */}
          <img className="login-logo-text" src={resortLogo} alt="Resort Logo" />
          <img className="login-image" src={loginAbstract} alt="" />
        </div>
        <div className="login-right">
          <h1
            className="loginTitle"
            style={{ marginBottom: "5px", marginTop: "10px" }}
          >
            Welcome to Ali Trip Resort
          </h1>
          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="&nbsp;&nbsp;Email Address"
            onChange={handleChangeLogin}
          />
          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="&nbsp;&nbsp;Password"
            onChange={handleChangeLogin}
          />
          <div className="login-remember-container">
            <input
              type="checkbox"
              id="remember_me"
              name="Remember Me"
              className="login-checkbox-remember"
            />
            <label htmlFor="remember_me" className="login-checkbox-remember">
              Remember Me
            </label>
            <a href="#/" className="login-recover-password">
              Recover Password
            </a>
          </div>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <GoogleLogin />
          <FbLoginComponent />

          <span className="login-signup">
            Don't have account? &nbsp;
            <a
              style={{ textDecoration: "underline", color: "black" }}
              href="#/"
              onClick={toggleModal}
            >
              Sign up
            </a>
          </span>

          <span className="login-copyright-text">
            Copyright Ⓒ All right received 2022 Ali Trip Resort
          </span>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
      >
        <Register close={toggleModal} />
      </Modal>
    </div>
  );
};

export default Login;
