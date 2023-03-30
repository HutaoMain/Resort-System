import { Facebook } from "@mui/icons-material";
import { UrlPath } from "../../../UrlPath";

const FbLoginComponent = () => {
  const handleClick = () => {
    window.open(`${UrlPath}/auth/facebook`, "_self");
  };

  return (
    <>
      <button className="facebook-login-btn" onClick={handleClick}>
        <Facebook color="primary" /> Login with Facebook
      </button>
    </>
  );
};

export default FbLoginComponent;
