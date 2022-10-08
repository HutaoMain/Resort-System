import "./UpdateRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const UpdateRoom = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REAC_APP_URL,
  });

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState("");

  const { data } = useFetch(`/rooms/${id}`);

  // get axios
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/rooms/${id}`);
      setRoomDetails(res.data);
    };
    fetchData();
  }, []);

  //update axios
  const handleClick = async () => {
    // e.preventDefault();
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      const res = await axiosInstance.put(`/rooms/${id}`, {
        ...roomDetails,
      });
      return res.data;
    } catch (err) {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  value={roomDetails.title}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  value={roomDetails.price}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      price: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Max People</label>
                <input
                  type="text"
                  value={roomDetails.maxPeople}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      maxPeople: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  value={roomDetails.desc}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      desc: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Rooms</label>
                {data.roomNumbers?.map((roomnumber, key) => (
                  <textarea key={key}>{roomnumber.number}</textarea>
                ))}
              </div>
              <div className="formInput">
                {/* <label>Choose a Service</label> */}
                {/* <input type="text" value={roomDetails.getServiceByRoom?.name} /> */}
              </div>
              <Link className="roomButton" to="/rooms" onClick={handleClick}>
                Update
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
