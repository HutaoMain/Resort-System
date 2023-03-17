import { Facebook } from "@mui/icons-material";
import { Button } from "@mui/material";
import { UrlPath } from "../../../UrlPath";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const FbLoginComponent = () => {
  const handleClick = () => {
    window.open(`${UrlPath}/auth/facebook`, "_self");
  };

  // const navigate = useNavigate();

  // const handleClick = async () => {
  //   try {
  //     window.open(`${UrlPath}/auth/facebook`, "_self");
  //     const data = await response.json();

  //     const { message } = data;
  //     toast.error(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 5000,
  //       closeOnClick: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // handle network error, e.g. display error message in toast
  //     toast.error("Failed to log in. Please try again later.", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 5000,
  //       closeOnClick: true,
  //     });
  //   }
  // };

  return (
    <>
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
    </>
  );
};

export default FbLoginComponent;
