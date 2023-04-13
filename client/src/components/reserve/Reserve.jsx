import "./Reserve.css";
import useFetch from "../../hooks/useFetch.js";
import { useState, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, totalprice }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedFacilityNumber, setSelectedFacilityNumber] = useState([]);
  // const [singleRoom, setSingleRoom] = useState({});

  // console.log(singleRoom);

  const { user } = useContext(AuthContext);
  const { dates } = useContext(SearchContext);

  // start of google save user
  const testAuthorization = async () => {
    const credentials = {
      name: user.name,
      email: user.email,
      img: user.picture === "" && user.picture.data.url,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/create`,
        credentials
      );
      // console.log(credentials);
    } catch (error) {}
  };

  // end of google save user

  // put here if facebook or put Or in credentials

  const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/rooms/${id}`);

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

  let alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  // const isAvailableEvery = (roomNumber) => {
  //   const isFound = roomNumber?.unavailableDates?.every((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );
  //   return !isFound;
  // };

  // useEffect(() => {
  //   data.roomNumbers?.map((item) => setSingleRoom(item));
  // }, [data.roomNumbers]);

  console.log(selectedFacilityNumber);

  const sample = async () => {
    const postReserve = {
      customerName: user.name,
      email: user.email,
      rooms: data.title,
      amount: totalprice,
      dateRange: dates,
      roomNumberId: selectedRooms.toString(),
      roomNumberName: selectedFacilityNumber.toString(),
    };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/reservations`,
      postReserve
    );
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const name = e.target.name;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    setSelectedFacilityNumber(
      checked
        ? [...selectedFacilityNumber, name]
        : selectedFacilityNumber.filter((number) => number !== name)
    );
  };

  // console.log(selectedRooms);

  // const handleOnFocus = (e) => {
  //   const checked = e.target.checked;
  //   setSelectedFacilityNumber(
  //     checked && [...selectedFacilityNumber]
  //     // : selectedRooms.filter((item) => item !== value)
  //   );
  // };

  // console.log(selectedRooms);

  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/email/send`, {
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      handleSendEmail();
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      sample();
      testAuthorization();
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button onClick={() => setOpen(false)} className="rClose">
          x
        </button>
        <span>Select your available Facility number:</span>

        <div className="rSelectRooms">
          {data.roomNumbers?.map((roomNumber) => (
            <div className="room">
              <label>Facility #: {roomNumber.number}</label>

              <input
                type="checkbox"
                id="checkboxReserve"
                value={roomNumber._id}
                onChange={handleSelect}
                name={roomNumber.number}
                defaultChecked={!isAvailable(roomNumber)}
                disabled={!isAvailable(roomNumber)}
                title={!isAvailable(roomNumber) ? "Already Reserved" : ""}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleClick}
          name="rBtn"
          className="rBtn"
          // disabled={!isAvailableEvery(singleRoom)}
        >
          Reserve Now!
        </button>
        <p style={{ color: "red", marginTop: "10px", marginBottom: "-5px" }}>
          <b>Disclaimer:</b> Once you Reserve check your email, you must pay
          before 2 hours- or else your reservation will be cancelled.
        </p>
      </div>
    </div>
  );
};

export default Reserve;
