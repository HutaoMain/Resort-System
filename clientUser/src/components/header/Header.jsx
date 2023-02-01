import "./Header.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../../context/SearchContext";

import { CalendarMonth } from "@mui/icons-material";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
// import { Input, Tooltip } from "antd";

const Header = () => {
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!openDate) {
      setErrorMessage("Please click at calendar to select a date ");
    } else {
      setErrorMessage("");

      dispatch({
        type: "NEW_SEARCH",
        payload: { dates },
        // options
      });
      navigate("/rooms", {
        state: { dates },
        // options
      });
    }
  };

  const handleDateSelect = (item) => {
    setOpenDate(true);
    setDates([item.selection]);
  };

  console.log(dates);

  return (
    <div>
      <div className="header-container">
        <div className="header-search-btn-whole">
          <div className="header-search-inside-item">
            <div className="header-calendar" onClick={() => setOpenDate(true)}>
              <CalendarMonth className="header-search-icon" />
              {/* <span
              onClick={() => setOpenDate(!openDate)}
              className="header-search-text"
            >
              {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span> */}
              {!openDate ? (
                <span>-- -- --</span>
              ) : (
                <span>
                  {`${format(dates[0]?.startDate, "MM/dd/yyyy")} to ${format(
                    dates[0]?.endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
              )}
            </div>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                // onChange={(item) => setDates([item.selection])}
                onChange={handleDateSelect}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="header-search-date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="header-search-inside-item">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
          <div className="header-search-inside-item">
            <button className="header-search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

/* <div className="headerSearchItem">
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
              </div> */
