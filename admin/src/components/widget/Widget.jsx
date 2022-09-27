import "./widget.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import useFetch from "../../hooks/useFetch.js";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  // let data;
  const [userData, setUserData] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/users");
      setUserData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/services");
      setServiceData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/rooms");
      setRoomData(res.data);
    };
    fetchData();
  }, []);

  // //temporary
  // const amount = 100;
  // const diff = 20;

  // switch (type) {
  //   case "user":
  //     data = {
  //       title: "USERS",
  //       isMoney: false,
  //       link: (
  //         <Link to={"/users"} style={{ textDecoration: "none" }}>
  //           See all users
  //         </Link>
  //       ),
  //       icon: (
  //         <PersonOutlinedIcon
  //           className="icon"
  //           style={{
  //             color: "crimson",
  //             backgroundColor: "rgba(255, 0, 0, 0.2)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "order":
  //     data = {
  //       title: "ORDERS",
  //       isMoney: false,
  //       link: "View all orders",
  //       icon: (
  //         <ShoppingCartOutlinedIcon
  //           className="icon"
  //           style={{
  //             backgroundColor: "rgba(218, 165, 32, 0.2)",
  //             color: "goldenrod",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "earning":
  //     data = {
  //       title: "EARNINGS",
  //       isMoney: true,
  //       link: "View net earnings",
  //       icon: (
  //         <MonetizationOnOutlinedIcon
  //           className="icon"
  //           style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "balance":
  //     data = {
  //       title: "BALANCE",
  //       isMoney: true,
  //       link: "See details",
  //       icon: (
  //         <AccountBalanceWalletOutlinedIcon
  //           className="icon"
  //           style={{
  //             backgroundColor: "rgba(128, 0, 128, 0.2)",
  //             color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   default:
  //     break;
  // }

  return (
    <div className="widget">
      {/* User */}
      <div className="widgetItem">
        <div className="left">
          <span className="title">User</span>
          <span className="counter">{userData.length}</span>
          <span className="link"></span>
        </div>
        <div className="right">
          <div>
            <PersonOutlineIcon className="percentage" />
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="widgetItem">
        <div className="left">
          <span className="title">Services</span>
          <span className="counter">{serviceData.length}</span>
          <span className="link"></span>
        </div>
        <div className="right">
          <div className="percentage">{/* <KeyboardArrowUpIcon /> */}</div>
        </div>
      </div>

      {/* Rooms */}
      <div className="widgetItem">
        <div className="left">
          <span className="title">Room</span>
          <span className="counter">{roomData.length}</span>
          <span className="link"></span>
        </div>
        <div className="right">
          <div className="percentage">{/* <KeyboardArrowUpIcon /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
