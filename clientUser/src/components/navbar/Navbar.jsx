import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../../pages/loginModal/LoginModal.jsx";
import { useState } from "react";

const Navbar = ({ user }) => {
  const location = useLocation();
  const path = location.pathname.split("/");

  const [isToggled, setToggle] = useState(false);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className={location.pathname !== "/" ? "navbar" : "navbarHome"}>
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">JOHN MIKO’S PLACE RESORT</span>
        </Link>
        <div className="navitems">
          {user ? (
            <div className="dropdown">
              <img src={user.photos[0].value} alt="" className="topAvatar" />
              <div className="dropdown-content">
                <span className="dropUsername"> {user.displayName} </span>
                <button className="btnLogout" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="navButton" onClick={() => setToggle(true)}>
                Login
              </button>
              <LoginModal
                isToggled={isToggled}
                onClose={() => setToggle(false)}
              ></LoginModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;