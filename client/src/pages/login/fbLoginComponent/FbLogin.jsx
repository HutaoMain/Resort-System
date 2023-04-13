import { AiFillFacebook } from "react-icons/ai";

const FbLoginComponent = () => {
  const handleClick = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/facebook`, "_self");
  };

  return (
    <>
      <button className="facebook-login-btn" onClick={handleClick}>
        <AiFillFacebook color="14A2F9" /> Login with Facebook
      </button>
    </>
  );
};

export default FbLoginComponent;
