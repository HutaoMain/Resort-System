import "./ViewRoom.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { UrlPath } from "../../../UrlPath";
import { KeyboardArrowLeft } from "@mui/icons-material";

const ViewRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const navigate = useNavigate();

  const { data, loading } = useFetch(`${UrlPath}/rooms/${id}`);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <button className="viewRoomBackButton" onClick={() => navigate(-1)}>
            <KeyboardArrowLeft />
            Cancel
          </button>
          <h1>View Room</h1>
        </div>
        <div className="bottom">
          <div className="viewRoomLeft">
            {loading ? (
              <div class="dataTableLoading"></div>
            ) : (
              data?.picture?.map((room, key) => (
                <img
                  src={room}
                  key={key}
                  alt="room"
                  className="viewRoomImage"
                />
              ))
            )}
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Title</label>
                <label>{data.title}</label>
              </div>
              <div className="formInput">
                <label>Price</label>
                <label>{data.price}</label>
              </div>

              <div className="formInput">
                <label>Max People</label>
                <label>{data.maxPeople}</label>
              </div>
              <div className="formInput">
                <label>Rooms Number</label>
                {data.roomNumbers?.map((roomnumber, key) => (
                  <label key={key}>{roomnumber.number}</label>
                ))}
              </div>
              <div className="formInput">
                <label>Description</label>
                <label>{data.desc}</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;
