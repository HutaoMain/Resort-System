import { Facebook } from "@mui/icons-material";
import { Button } from "@mui/material";
import { UrlPath } from "../../../UrlPath";
// import { useNavigate } from "react-router-dom";

const FbLoginComponent = () => {
  const handleClick = () => {
    window.open(`${UrlPath}/auth/facebook`, "_self");
  };

  return (
    <Button
      variant="outlined"
      startIcon={<Facebook color="primary" />}
      sx={{
        color: "black",
        width: "340px",
        height: "50px",
        fontSize: "15px",
        textTransform: "capitalize",
        border: "2px solid black ",
        borderRadius: "10px",
        marginTop: "20px",
        "&:hover": { border: "solid 2px #ccc; " },
      }}
      onClick={handleClick}
    >
      Login with Facebook
    </Button>
  );
};

export default FbLoginComponent;
