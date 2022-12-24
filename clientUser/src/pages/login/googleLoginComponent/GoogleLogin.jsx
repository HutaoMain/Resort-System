import { useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import jwtDecode from "jwt-decode";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleResponse = (response) => {
    jwtDecode(response.credential);
    // dispatch({ type: "LOGIN_SUCCESS", payload: userObject });
    navigate("/", { replace: true });
  };

  const handleGoogleLogin = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENTID,
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
    <Button
      variant="outlined"
      startIcon={<Google />}
      onClick={handleGoogleLogin}
      sx={{
        width: "50%",
        textTransform: "capitalize",
        border: "2px solid black ",
        borderRadius: "10px",
        "&:hover": { border: "solid 2px #19A0E1; " },
      }}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
