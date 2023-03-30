import { FcGoogle } from "react-icons/fc";
import { UrlPath } from "../../../UrlPath";

const GoogleLogin = () => {
  const handleClick = () => {
    window.open(`${UrlPath}/auth/google`, "_self");
  };

  return (
    <button onClick={handleClick} className="google-login-btn">
      <FcGoogle />
      Login with Google
    </button>
  );
};

export default GoogleLogin;
