import "./Reserve.css";
import useFetch from "../../hooks/useFetch.js";
import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Reserve = ({ setOpen, serviceid, totalprice }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [reservation, setReservation] = useState("");
  const [serviceData, setServiceData] = useState("");

  //services
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/services/find/${id}`);
      setServiceData(res.data);
    };
    fetchData();
  }, []);

  const [user, setUser] = useState(null);

  const { dates, options } = useContext(SearchContext);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const { data, loading, error } = useFetch(
    `http://localhost:5000/services/rooms/${serviceid}`
  );

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

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  // const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  // const found = data.find((obj) => {
  //   return obj?.price;
  // });

  const sample = async () => {
    const postReserve = {
      customerName: user.displayName,
      service: serviceData.name,
      amount: totalprice,
      dateRange: dates,
    };

    await axios.post("/reservations", postReserve);
    console.log(postReserve);
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  console.log(selectedRooms);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:5000/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      sample();
      setOpen(false);
      navigate(-1);
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button onClick={() => setOpen(false)} className="rClose">
          x
        </button>
        <span>Select your rooms:</span>
        {data.map(
          (item, key) =>
            item && (
              <div className="rItem" key={key}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMaxPeeps">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{totalprice}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
