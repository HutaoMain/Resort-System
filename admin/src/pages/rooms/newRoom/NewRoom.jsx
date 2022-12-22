import "./NewRoom.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import {
  DriveFolderUploadOutlined,
  KeyboardArrowLeft,
  Add,
} from "@mui/icons-material";
import { useState } from "react";
import { roomInputs } from "../../../formSource";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UrlPath } from "../../../UrlPath";

const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
      try {
        await axios.post(`${UrlPath}/rooms`, {
          ...info,
          roomNumbers,
          picture: list,
        });
      } catch (err) {}
      navigate("/rooms", { replace: true });
    } catch (err) {}
  };

  console.log(files);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Facility</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

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
                <label>Give number with the same facility</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room number no space"
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleAddRoom}>
                  <Add />
                  Add
                </button>
                <Link to="/rooms" style={{ textDecoration: "none" }}>
                  <button className="viewRoomBackButton">
                    <KeyboardArrowLeft />
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
