import "./Navbar.css";
import resortLogo from "../../images/navbarLogo.png";

import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  // const logout = () => {
  //   localStorage.removeItem("jwt_token");
  //   window.location.reload();
  // };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img className="navbar-logo" src={resortLogo} alt="logo" />
        </Link>
        <div className="nav-items">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={
                  user.picture?.data?.url ||
                  user?.picture ||
                  "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                }
                alt="profile pic"
                className="navbar-avatar"
              />
              {/* <div
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
                  onClick={logout}
                >
                  Logout
                  <ExitToApp />
                </button>
              </div> */}
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
