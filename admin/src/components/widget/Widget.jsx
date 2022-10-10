import "./widget.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
  });

  const [userData, setUserData] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/users");
      setUserData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/services");
      setServiceData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/rooms");
      setRoomData(res.data);
    };
    fetchData();
  }, []);

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
          <div>
            <MiscellaneousServicesIcon className="percentage" />
          </div>
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
          <div>
            <AddHomeWorkIcon className="percentage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
