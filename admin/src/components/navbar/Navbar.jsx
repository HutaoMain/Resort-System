import "./navbar.scss";
import { NotificationsActive, DarkModeOutlined } from "@mui/icons-material";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Badge, Tooltip } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { UrlPath } from "../../UrlPath";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const { data } = useFetch(`${UrlPath}/reservations`);

  const pending = data?.filter((item) => item.status === "Pending");

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"></div>
        <div className="items">
          <div className="item">
            <DarkModeOutlined
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            <Link to="/reservations">
              <Tooltip title="Number of Pendings" arrow>
                <Badge
                  className="badge"
                  badgeContent={pending.length}
                  color="secondary"
                >
                  <NotificationsActive className="icon" />
                </Badge>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
