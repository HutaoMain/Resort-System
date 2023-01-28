import { FcGoogle } from "react-icons/fc";
import { Button } from "@mui/material";
import { UrlPath } from "../../../UrlPath";

const GoogleLogin = () => {
  const handleClick = () => {
    window.open(`${UrlPath}/auth/google`, "_self");
  };

  return (
    <Button
      variant="outlined"
      startIcon={<FcGoogle />}
      onClick={handleClick}
      sx={{
        color: "black",
        width: "340px",
        height: "50px",
        fontSize: "15px",
        textTransform: "capitalize",
        border: "2px solid black ",
        borderRadius: "10px",
        marginTop: "30px",
        "&:hover": { border: "solid 2px #ccc; " },
      }}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
