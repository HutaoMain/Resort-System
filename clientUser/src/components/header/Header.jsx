import "./Header.css";
import {
  Bed,
  Flight,
  DirectionsCarFilled,
  Attractions,
  AirportShuttle,
  CalendarMonth,
  Person,
  AccessTime,
  FamilyRestroomOutlined,
} from "@mui/icons-material";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, setDate } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import List from "../../pages/list/List";

const Header = ({ type }) => {
  const location = useLocation();
  const path = location.pathname.split("/");

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  days = days + 1;

  const [checkedBox1, setCheckedBox1] = useState(true);
  const [checkedBox2, setCheckedBox2] = useState(false);
  const [checkedBox3, setCheckedBox3] = useState(false);
  const handleClick1 = () => {
    setCheckedBox1((prev) => !prev);
  };
  const handleClick2 = () => {
    setCheckedBox2((prev) => !prev);
  };
  const handleClick3 = () => {
    setCheckedBox3((prev) => !prev);
  };

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [openTime, setOpenTime] = useState(false);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { dates, options, checkedBox1, checkedBox2, checkedBox3 },
    });
    navigate("/services", {
      state: { dates, options, checkedBox1, checkedBox2, checkedBox3 },
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {location.pathname !== "/" && (
          <div className="headerList">
            <div className="headerListItem active">
              <Bed />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <Flight />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <DirectionsCarFilled />
              <span>Car Rentals</span>
            </div>
            <div className="headerListItem">
              <Attractions />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <AirportShuttle />
              <span>Airport Taxis</span>
            </div>
          </div>
        )}
        {type !== "list" && (
          <>
            <h1 className="headerTitle">What is Lorem Ipsum?</h1>
            <p className="headerDesc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <button className="headerBtn">Discover More</button>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <CalendarMonth className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <Person className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >
                  {`${options.adult} adult - 
                  ${options.children} children - 
                  ${options.room} room `}
                </span>

                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNum">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNum">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNum">{options.room}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <AccessTime className="headerIcon" />
                <span
                  onClick={() => setOpenTime(!openTime)}
                  className="headerSearchText"
                >
                  What time you want to avail ?
                </span>

                {openTime && (
                  <div className="times">
                    <div className="timesItem">
                      <span className="timesText">8:00AM to 5:00PM</span>
                      <div className="timesCounter">
                        <input
                          type="checkbox"
                          className="timesCheckbox"
                          checked={checkedBox1}
                          onChange={handleClick1}
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div className="timesItem">
                      <span className="timesText">6:00PM to 12:00AM</span>
                      <div className="timesCounter">
                        <input
                          type="checkbox"
                          className="timesCheckbox"
                          checked={checkedBox2}
                          onChange={handleClick2}
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div className="timesItem">
                      <span className="timesText">6:00PM to 6:00AM</span>
                      <div className="timesCounter">
                        <input
                          type="checkbox"
                          className="timesCheckbox"
                          checked={checkedBox3}
                          onChange={handleClick3}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
