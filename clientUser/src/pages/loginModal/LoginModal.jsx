import {Link} from 'react-router-dom';
import './LoginModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import loginImg from "../../images/login.png";

const LoginModal = ({ isToggled, children, onClose }) => {

  const google = () =>{
    window.open("http://localhost:5000/auth/google", "_self")
  };

  const facebook = () =>{
    window.open("http://localhost:5000/auth/facebook", "_self")
  }

  return(
    <AnimatePresence>
       {isToggled && (
        <>
        <motion.div 
          initial={{
            opacity: 0
          }}
          animate ={{
            opacity: 1,
            transition: {
              duration: 0.3
            }
          }}
          exit={{
            opacity:0
          }}
        className="modalContainer">
            <motion.div 
            initial={{
              scale: 0
            }}
            animate ={{
              scale: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              scale:0
            }}
            className="wholeLogin">
                <img src={loginImg} alt="user" className="userLgnImg"/>
                <Link to = "/"><button onClick={onClose} className = "close">x</button></Link>
                <h1 className="loginTitle">Login Method</h1>
                <button class="loginBtn loginBtn--facebook" onClick={facebook}>
                  Login with Facebook
                </button>
                <button class="loginBtn loginBtn--google" onClick={google}>
                  Login with Google
                </button>
                <hr className="hLine"/>
                <p className= "termsNservice">By logging in, I agree to John Miko's Place Resort's <br/>
                Terms of Service and Privacy Policy.</p>
                {children}
            </motion.div>
        </motion.div>
        </>
        )}
    </AnimatePresence>
  );
}

export default LoginModal;

