import "./UpdateService.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateService = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [files, setFiles] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const { data, loading } = useFetch("http://api.johnmikoresort.store/rooms");

  //get axios
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://api.johnmikoresort.store/services/find/${id}`
      );
      setServiceData(res.data);
    };
    fetchData();
  }, []);

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  //update axios
  const handleClick = async () => {
    try {
      const res = await axios.put(
        `http://api.johnmikoresort.store/services/${id}`,
        {
          ...serviceData,
          rooms,
        }
      );
      return res.data;
    } catch (error) {}
    navigate("/services", { replace: true });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Service</h1>
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
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
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
                <label>Name</label>
                <input
                  type="text"
                  value={serviceData.name}
                  onChange={(e) => {
                    setServiceData((data) => ({
                      ...data,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Type</label>
                <input
                  type="text"
                  value={serviceData.type}
                  onChange={(e) => {
                    setServiceData((data) => ({
                      ...data,
                      type: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  value={serviceData.desc}
                  onChange={(e) => {
                    setServiceData((data) => ({
                      ...data,
                      desc: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  value={serviceData.address}
                  onChange={(e) => {
                    setServiceData((data) => ({
                      ...data,
                      address: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  value={serviceData.cheapestPrice}
                  onChange={(e) => {
                    setServiceData((data) => ({
                      ...data,
                      cheapestPrice: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured">
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data.map((room, key) => (
                        <option key={key} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
