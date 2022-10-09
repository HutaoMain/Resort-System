import { Link, useNavigate } from "react-router-dom";
import "./LoginModal.css";
import { motion, AnimatePresence } from "framer-motion";
import loginImg from "../../images/login.png";

const LoginModal = ({ isToggled, children, onClose }) => {
  // const navigate = useNavigate();

  const google = () => {
    window.open("http://api.johnmikoresort.store/auth/google", "_self");
  };

  // "width=500,height=500, top=75, left=400"

  const facebook = () => {
    window.open("http://api.johnmikoresort.store/auth/facebook", "_self");
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
              <h1 className="loginTitle">Login Method</h1>
              <button class="loginBtn loginBtn--facebook" onClick={facebook}>
                Login with Facebook
              </button>
              <button class="loginBtn loginBtn--google" onClick={google}>
                Login with Google
              </button>
              <hr className="hLine" />
              <p className="termsNservice">
                By logging in, I agree to John Miko's Place Resort's <br />
                Terms of Service and Privacy Policy.
              </p>
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
