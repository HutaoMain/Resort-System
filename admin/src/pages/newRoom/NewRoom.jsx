import "./NewRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
  });

  const [info, setInfo] = useState({});
  const [serviceId, setServiceId] = useState();
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/services");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axiosInstance.post("/rooms", { ...info, roomNumbers });
    } catch (err) {}
    navigate("/rooms", { replace: true });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room number"
                />
              </div>
              <div className="formInput">
                <label>Choose a Service</label>
                <select
                  id="serviceId"
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Add Room</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
