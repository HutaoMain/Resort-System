import "./FbLogin.css";
// import FacebookLogin from "react-facebook-login";
// import jwtDecode from "jwt-decode";
// import { AuthContext } from "../../../context/AuthContext";
// import { useContext } from "react";
// import axios from "axios";
import { Facebook } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { UrlPath } from "../../../UrlPath";
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Send a request to the server to initiate the OAuth2 flow
  //   axios
  //     .get(`/auth/facebook`)
  //     .then((response) => {
  //       // If the request is successful, the server will redirect the user to the Facebook login page
  //       window.location.href = response.data.redirect;
  //     })
  //     .catch((error) => {
  //       // If there is an error, display an error message
  //       console.error(error);
  //     });
  // };

  // const CLIENT_ID = "598419755425063";
  // const CLIENT_SECRET = "075725c2950db8c63669a7964a204ea5";

  // const handleClick = async () => {
  //   try {
  //     // Redirect the user to the Facebook authentication endpoint
  //     window.location.href = `https://www.facebook.com/v8.0/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/auth/facebook/callback&scope=email,public_profile`;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleClick = async () => {
    try {
      await axios.get("http://localhost:5000/auth/facebook/callback");
    } catch (err) {
      console.log(err);
    }
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
      onClick={handleClick}
    >
      Login with Facebook
    </Button>
  );
};

export default FbLoginComponent;
