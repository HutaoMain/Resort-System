import "./widget.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import axios from "axios";
import { useEffect, useState } from "react";
import { UrlPath } from "../../UrlPath";

const Widget = () => {
  const [userData, setUserData] = useState("");
  const [reservation, setReservation] = useState([]);
  const [roomData, setRoomData] = useState([]);

  //change into useFetch data then 1 useeffect with 3 usestate
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${UrlPath}/users`);
      setUserData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${UrlPath}/reservations`);
      setReservation(res.data);
    };
    fetchData();
  }, []);

  const approved = reservation?.filter((item) => item.status === "Approved");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${UrlPath}/rooms`);
      setRoomData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      {/* User */}
      <div className="widgetItem">
        <div className="left">
          <span className="title">Users</span>
          <span className="counter">{userData.length}</span>
          <span className="link"></span>
        </div>
        <div className="right">
          <div>
            <PersonOutlineIcon className="percentage" />
          </div>
        </div>
      </div>

      {/* Reservations */}
      <div className="widgetItem">
        <div className="left">
          <span className="title">Approved Reservations</span>
          <span className="counter">{approved?.length}</span>
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
          <span className="title">Rooms</span>
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
