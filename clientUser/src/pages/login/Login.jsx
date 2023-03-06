import "./Login.css";
import FbLoginComponent from "./fbLoginComponent/FbLogin";
import resortLogo from "../../images/resortLogo.png";
import GoogleLogin from "./googleLoginComponent/GoogleLogin";
import Modal from "react-modal";
import Register from "./registration/Register";
import { useState } from "react";
import { UrlPath } from "../../UrlPath";
import axios from "axios";
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

const forgotPasswordModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "100px",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    overflow: "hidden",
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);

  const navigate = useNavigate();

  //comment to preserve
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post(`${UrlPath}/auth/login`, { email, password } )
  //       .then((response) => {
  //         const token = response.data.token;
  //         // Set HTTP-only cookie with the token
  //         document.cookie = `jwt_token=${token}; Secure; HttpOnly`;
  //       });
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     setError("Incorrect Email or Password");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${UrlPath}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      // Set HTTP-only cookie with the token
      document.cookie = `jwt_token=${token}; path=/; HttpOnly;`;
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError("Incorrect Email or Password");
    }
  };

  const toggleModalSignUp = () => {
    setIsOpenSignUp(!isOpenSignUp);
  };

  const toggleModalForgotPass = () => {
    setIsOpenForgotPass(!isOpenForgotPass);
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-logo-tagline">
            <img
              className="login-logo-text"
              src={resortLogo}
              alt="Resort Logo"
            />
            <h1 className="login-tagline">
              Discover your own slice of paradise.
            </h1>
          </div>
        </div>
        <div className="login-right">
          {/* <div className="login-right-container"> */}
          <h2
            className="loginTitle"
            style={{ marginBottom: "5px", marginTop: "10px" }}
          >
            Welcome to Ali Trip Resort
          </h2>
          <span>Please login your details</span>
          <GoogleLogin />
          <FbLoginComponent />

          <h4 className="login-or">OR</h4>

          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="&nbsp;&nbsp;Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="&nbsp;&nbsp;Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="login-remember-container">
            {/* <input
                type="checkbox"
                id="remember_me"
                name="Remember Me"
                className="login-checkbox-remember"
              /> */}
            {/* <label htmlFor="remember_me" className="login-checkbox-remember">
                Remember Me
              </label> */}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleModalForgotPass}
            >
              Recover Password
            </span>
          </div>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <span className="login-signup">
            Don't have account? &nbsp;
            <a
              style={{ textDecoration: "underline", color: "black" }}
              href="#/"
              onClick={toggleModalSignUp}
            >
              Sign up
            </a>
          </span>
          <span className="login-copyright-text">
            Copyright Ⓒ All right received 2022 Ali Trip Resort
          </span>
        </div>
      </div>
      {/* Register Modal */}
      <Modal
        isOpen={isOpenSignUp}
        onRequestClose={toggleModalSignUp}
        contentLabel="My dialog"
        style={customStyles}
      >
        <Register close={toggleModalSignUp} />
      </Modal>
      {/* Forgot Password Modal */}
      <Modal
        isOpen={isOpenForgotPass}
        onRequestClose={toggleModalForgotPass}
        contentLabel="My dialog"
        style={forgotPasswordModalStyle}
      >
        <div className="forgot-password-container">
          <input className="forgot-password-input" type="email" />
          <button className="forgot-password-btn">Forgot Password</button>
        </div>
      </Modal>
      {/* </div> */}
    </div>
  );
};

export default Login;
