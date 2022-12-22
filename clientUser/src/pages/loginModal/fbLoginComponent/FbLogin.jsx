import FacebookLogin from "react-facebook-login";
// import jwtDecode from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./FbLogin.css";

const FbLoginComponent = ({ checkbox }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const responseFacebook = (response) => {
    // var userObject = jwtDecode(response);
    // console.log(userObject);
    console.log(response);

    dispatch({ type: "LOGIN_SUCCESS", payload: response });
    navigate("/", { replace: true });
  };

  return (
    <div>
      <FacebookLogin
        appId="477706624375622"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"
        cssClass={checkbox ? "fbloginStyle" : "disbaleFbLoginStyle"}
        isDisabled={checkbox ? false : true}
      />
    </div>
  );
};

export default FbLoginComponent;
