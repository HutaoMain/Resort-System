import "./UpdateRoom.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import {
  DriveFolderUploadOutlined,
  KeyboardArrowLeft,
  Cached,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { UrlPath } from "../../../UrlPath";

const UpdateRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [roomDetails, setRoomDetails] = useState({});
  const [roomNo, setRoomNo] = useState([]);
  const [files, setFiles] = useState("");

  const navigate = useNavigate();

  const { data } = useFetch(`${UrlPath}/rooms/${id}`);

  useEffect(() => {
    setRoomDetails(data);
  }, [data]);

  const array = roomDetails.roomNumbers;
  let arrayRooms = [];
  for (let i = 0; i < array?.length; i++) {
    arrayRooms.push(array?.[i].number);
  }

  //update axios
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (files === "") {
        let imageStore = [];
        roomDetails.picture?.map((room) => {
          return imageStore.push(room);
        });

        const roomNumbers = roomNo.split(",").map((room) => ({ number: room }));

        await axios.put(`${UrlPath}/rooms/${id}`, {
          ...roomDetails,
          roomNumbers: roomNumbers,
          picture: imageStore,
        });
        navigate("/rooms");
      } else {
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

        const roomNumbers = roomNo.split(",").map((room) => ({ number: room }));

        await axios.put(`${UrlPath}/rooms/${id}`, {
          ...roomDetails,
          roomNumbers: roomNumbers,
          picture: list,
        });
        navigate("/rooms");
      }
    } catch (err) {}
  };

  console.log(files);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Facility</h1>
        </div>
        <div className="bottom">
          <div className="updateRoomLeft">
            {files
              ? URL.createObjectURL(files[0])
              : roomDetails?.picture?.map((room, key) => {
                  return (
                    <img
                      key={key}
                      src={room}
                      alt="rooms"
                      style={{ marginRight: "5px" }}
                    />
                  );
                })}
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

              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  defaultValue={roomDetails.title}
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
                  defaultValue={roomDetails.price}
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
                  defaultValue={roomDetails.maxPeople}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      maxPeople: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput" style={{ marginLeft: "2px" }}>
                <label>Description</label>
                <input
                  type="text"
                  defaultValue={roomDetails.desc}
                  onChange={(e) => {
                    setRoomDetails((data) => ({
                      ...data,
                      desc: e.target.value,
                    }));
                  }}
                />
                <label style={{ marginTop: "20px" }}>
                  <p style={{ fontSize: "15px", marginTop: "10px" }}>
                    Number with the same facility:
                  </p>
                  <i
                    style={{
                      fontSize: "10px",
                      marginTop: "10px",
                    }}
                  >
                    please separate them with coma (,) and no space.
                  </i>
                </label>
                <input
                  style={{ marginTop: "20px", width: "100%" }}
                  defaultValue={arrayRooms}
                  onChange={(e) => setRoomNo(e.target.value)}
                  placeholder="give comma between room number"
                />
              </div>
              <div className="formInput"></div>
              <button onClick={handleClick}>
                <Cached />
                Update
              </button>
              <Link to="/rooms" style={{ textDecoration: "none" }}>
                <button className="viewRoomBackButton">
                  <KeyboardArrowLeft />
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
