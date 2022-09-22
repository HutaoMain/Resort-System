import "./UpdateRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [serviceId, setServiceId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState("");

  // const { data, loading, error } = useFetch("/services");
  const { data, loading, error } = useFetch(
    `http://localhost:5000/rooms/${id}`
  );

  // //get axios from serviceId
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:5000/services/rooms/${id}`);
  //     setServiceId(res.data);
  //   };
  //   fetchData();
  // }, []);

  // get axios
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/rooms/${id}`);
      setRoomDetails(res.data);
    };
    fetchData();
  }, []);

  //update axios
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.put(`http://localhost:5000/rooms/${id}`, {
        ...roomDetails,
        roomNumbers,
      });
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
                  value={roomDetails.getRoombyId?.title}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  value={roomDetails.getRoombyId?.price}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  value={roomDetails.getRoombyId?.price}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Max People</label>
                <input
                  type="text"
                  value={roomDetails.getRoombyId?.maxPeople}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  value={roomDetails.getRoombyId?.desc}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Rooms</label>
                {data.getRoombyId?.roomNumbers?.map((roomnumber, key) => (
                  <textarea key={key}>{roomnumber.number}</textarea>
                ))}
              </div>
              <div className="formInput">
                <label>Choose a Service</label>
                {/* <select id="serviceId">
                  onChange={(e) => setServiceId(e.target.value)}
                  {loading
                    ? "loading"
                    : data &&
                      data.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                </select> */}
                <input type="text" value={roomDetails.getServiceByRoom?.name} />
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
