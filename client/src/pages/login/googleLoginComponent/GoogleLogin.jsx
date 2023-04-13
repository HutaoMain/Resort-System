import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const handleClick = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <button onClick={handleClick} className="google-login-btn">
      <FcGoogle />
      Login with Google
    </button>
  );
};

export default GoogleLogin;
