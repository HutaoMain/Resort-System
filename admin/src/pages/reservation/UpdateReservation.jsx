import "./UpdateReservation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { UrlPath } from "../../UrlPath";

const UpdateReservation = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data, loading } = useFetch(`${UrlPath}/reservations/${id}`);

  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [roomIdMap, setRoomIdMap] = useState([]);
  const [arrayOfDate, setArrayOfDate] = useState([]);

  useEffect(() => {
    setSelectedStatus(data.status);
  }, [data]);

  // const dates = [
  //   {
  //     startDate: data.dateRange?.[0].startDate,
  //     endDate: data.dateRange?.[0].endDate,
  //     key: "selection",
  //   },
  // ];

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    setRoomIdMap(data?.roomNumberId?.split(",")?.map((item) => item));
  }, [data?.roomNumberId]);

  useEffect(() => {
    let alldates = getDatesInRange(
      data.dateRange?.[0].startDate,
      data.dateRange?.[0].endDate
    );
    setArrayOfDate(alldates.map((item) => new Date(item).toISOString()));
  }, [data.dateRange]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (selectedStatus?.status === "Rejected") {
        await Promise.all(
          arrayOfDate.map((item) => {
            return roomIdMap.map((roomId) => {
              const res = axios.put(`${UrlPath}/rooms/roomnumber/${roomId}`, {
                dates: item,
              });
              return res.data;
            });
          })
        );

        const res = await axios.put(`${UrlPath}/reservations/${id}`, {
          status: selectedStatus,
        });
        navigate("/reservations");
        return res.data;
      } else {
        const res = await axios.put(`${UrlPath}/reservations/${id}`, {
          status: selectedStatus,
        });
        navigate("/reservations");
        return res.data;
      }
    } catch (err) {}
  };

  return (
    <div className="updateReservation">
      {loading ? (
        "loading"
      ) : (
        <>
          <Sidebar />
          <div className="updateResContainer">
            <Navbar />
            <div className="updateResTop">
              <h1>Edit Status</h1>
            </div>
            <div className="updateResBottom">
              <div className="updateResRight">
                <form>
                  <div className="updateResForm">
                    <label>Status</label>
                    <select
                      defaultValue={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus((data) => ({
                          ...data,
                          status: e.target.value,
                        }));
                      }}
                    >
                      <option
                        value="Approved"
                        className="cellWithStatus Approved"
                      >
                        Approved
                      </option>
                      <option
                        value="Pending"
                        className="cellWithStatus Pending"
                      >
                        Pending
                      </option>
                      <option
                        value="Rejected"
                        className="cellWithStatus Rejected"
                      >
                        Rejected
                      </option>
                    </select>
                  </div>
                  <Link className="roomButton" to="/rooms">
                    <button className="updateResBtn" onClick={handleUpdate}>
                      Update
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateReservation;
