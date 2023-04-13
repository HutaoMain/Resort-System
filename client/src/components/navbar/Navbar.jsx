import "./Navbar.css";
import resortLogo from "../../images/navbarLogo.png";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log("profile", user);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img className="navbar-logo" src={resortLogo} alt="logo" />
        </Link>
        <div className="nav-items">
          {user ? (
            <div className="profile-dropdown">
              <img
                src={user?.picture || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"}
                alt="profile pic"
                className="navbar-avatar"
                onClick={toggleDropdown}
              />
              <span>user?.email</span>
              {isOpen && (
                <div className="dropdown-content">
                  <Link to="/profile">
                    <span>Profile</span>
                  </Link>
                  <span>Settings</span>
                  <span onClick={() => logout()}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="navbar-login">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
