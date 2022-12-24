import "./FbLogin.css";
// import FacebookLogin from "react-facebook-login";
// import jwtDecode from "jwt-decode";
// import { AuthContext } from "../../../context/AuthContext";
// import { useContext } from "react";
import axios from "axios";
import { Facebook } from "@mui/icons-material";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const FbLoginComponent = () => {
  // const navigate = useNavigate();
  // const { dispatch } = useContext(AuthContext);

  // const responseFacebook = (response) => {
  //   // var userObject = jwtDecode(response);
  //   // console.log(userObject);
  //   console.log(response);

  //   // dispatch({ type: "LOGIN_SUCCESS", payload: response });
  //   navigate("/", { replace: true });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server to initiate the OAuth2 flow
    axios
      .get(`/auth/facebook`)
      .then((response) => {
        // If the request is successful, the server will redirect the user to the Facebook login page
        window.location.href = response.data.redirect;
      })
      .catch((error) => {
        // If there is an error, display an error message
        console.error(error);
      });
  };

  return (
    <Button
      variant="outlined"
      startIcon={<Facebook />}
      // onClick={handleGoogleLogin}
      sx={{
        width: "50%",
        textTransform: "capitalize",
        border: "2px solid black ",
        borderRadius: "10px",
        marginTop: "10px",
        "&:hover": { border: "solid 2px #19A0E1; " },
      }}
      onClick={handleSubmit}
    >
      Login with Facebook
    </Button>
  );
};

export default FbLoginComponent;

/* <FacebookLogin
        appId="477706624375622"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"
        textButton="&nbsp;&nbsp;&nbsp;Login with Facebook"
        cssClass="fblogin-class"
        // cssClass={checkbox ? "fbloginStyle" : "disbaleFbLoginStyle"}
        // isDisabled={checkbox ? false : true}
      /> */
