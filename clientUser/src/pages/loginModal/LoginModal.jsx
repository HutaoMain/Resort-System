import { Link, useNavigate } from "react-router-dom";
import "./LoginModal.css";
import { motion, AnimatePresence } from "framer-motion";
import loginImg from "../../images/login.png";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FbLoginComponent from "./fbLoginComponent/FbLogin";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

const LoginModal = ({ isToggled, children, onClose }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [checkbox, setCheckbox] = useState(false);

  const toggleCheck = () => {
    setCheckbox(!checkbox);
  };

  const handleResponse = (response) => {
    var userObject = jwtDecode(response.credential);
    dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
    navigate("/", { replace: true });
  };

  const handleGoogleLogin = () => {
    try {
      window.google.accounts.id.initialize({
        client_id:
          "442836680666-5ojvaini79uu44rdneffm1l8crl4nse5.apps.googleusercontent.com",
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later!");
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isToggled && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className="modalContainer"
          >
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                scale: 0,
              }}
              className="wholeLogin"
            >
              <img src={loginImg} alt="user" className="userLgnImg" />
              <Link to="/">
                <button onClick={onClose} className="close">
                  x
                </button>
              </Link>
              <h1
                className="loginTitle"
                style={{ marginBottom: "5px", marginTop: "10px" }}
              >
                Login Method
              </h1>

              <Button
                variant="outlined"
                startIcon={<Google />}
                disabled={checkbox ? false : true}
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
              <FbLoginComponent checkbox={checkbox} />

              <hr className="hLine" />

              <div>
                <input
                  type="checkbox"
                  onChange={toggleCheck}
                  style={{
                    position: "absolute",
                    left: "30px",
                    height: "15px",
                    width: "15px",
                  }}
                />
                <div className="termsNservice">
                  By checking this, You agree to John Miko's Place Resort's.
                  <a href="https://www.freeprivacypolicy.com/live/95f3ff72-d446-4d95-ba1c-8a4af08ad800?fbclid=IwAR15u_lTcnvhI9erraaMRFsNT7EnuZAV-L_7g2lO2x_hoDFVk_X0CnQO3Fg">
                    Terms of Service and Privacy Policy.
                  </a>
                </div>
              </div>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
