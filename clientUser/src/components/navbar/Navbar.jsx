import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
import { ExitToApp } from "@mui/icons-material";
import { KeyboardBackspace, Home } from "@mui/icons-material";

const Navbar = ({ user }) => {
  // const { dispatch } = useContext(AuthContext);

  const location = useLocation();

  const navigate = useNavigate();

  // const [isToggled, setToggle] = useState(false);
  // const logout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  return (
    <div className={location.pathname === "/" ? "navbarHome" : "navbars"}>
      <div className="navbarHomeContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <Home />
            JOHN MIKO’S PLACE RESORT
          </span>
        </Link>
        <div
          className={
            location.pathname === "/" ? "homeExtraBtnHide" : "homeExtraBtnShow"
          }
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "white",
            }}
          >
            <KeyboardBackspace />
            <span>Back</span>
          </button>
        </div>
        <div className="navitems">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={
                  user.picture?.data?.url || user?.picture
                  // || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                }
                alt="profilePic"
                className="topAvatar"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <span>{user.firstName}</span>
                <button
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  // onClick={logout}
                >
                  Logout
                  <ExitToApp />
                </button>
              </div>
            </div>
          ) : (
            // <div className="dropdown">
            //   <img
            //     src={user.picture?.data?.url || user?.picture}
            //     alt=""
            //     className="topAvatar"
            //   />
            //   <div className="dropdown-content">
            //     <span className="dropUsername"> {user.name} </span>
            //     <button className="btnLogout" onClick={logout}>
            //       Logout
            //     </button>
            //   </div>
            // </div>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
