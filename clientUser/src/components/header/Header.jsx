import "./Header.css";
import { CalendarMonth, Foundation } from "@mui/icons-material";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "30%",
    borderRadius: "20px",
  },
};

Modal.setAppElement("#root");

const Header = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { dates },
      // options
    });
    navigate("/rooms", {
      state: { dates },
      // options
    });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  var dateToday = new Date();
  var numberOfdaysToAdd = 2;
  var minimumDate = dateToday.setDate(dateToday.getDate() + numberOfdaysToAdd);

  return (
    <div
      className="header"
      style={
        location.pathname === "/" ? { height: "270px" } : { height: "auto" }
      }
    >
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">John Mikos Place Resort...</h1>
            <p className="headerDesc">
              was established in the year 2018, and owned by Mr. Joseph
              Gonzales. It is located in Barangay Pulong Yantok Sentinela Road
              Angat, Bulacan. They have 4 pools, 10 cottages, 2 function hall
              that has a capacity of 200 people, 1 Nipa Hut, and 6 rooms for the
              guest and they also offer an events place for all occasions or any
              kinds of gathering such as weddings, birthdays, seminars,
              baptismal and for catering chairs and tables, mobile bar, lights
              and sound all in the package.
              <button className="missionBtn" onClick={toggleModal}>
                <Foundation />
                Mission/Vision
              </button>
            </p>

            <p
              className={
                user ? "headerNoticeloginHide" : "headerNoticeloginShow"
              }
            >
              <b> Please Login at the top to use reservation.</b>
            </p>

            <div className={user ? "headerSearch" : "headerSearchDisabled"}>
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
                    minDate={new Date(minimumDate)}
                  />
                )}
              </div>
              {/* <div className="headerSearchItem">
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
              </div> */}

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
      >
        <p>
          <b style={{ fontSize: "20px" }}>Mission</b> <br /> <hr /> The mission
          of the John Mikos Place Resort is to put hospitality services on the
          highest level in order to satisfy the demands and expectations of
          guests. Our aim is to make the John Mikos Place Resort a place for
          encounters, business success and pleasant meetings. <br /> <br />{" "}
          <b style={{ fontSize: "20px" }}>Vision</b> <br /> <hr /> The ideology
          of our vision is to continue to apply and set the highest standards of
          service quality and in that way justify and uphold the reputation that
          we have among the guests, partners, competitors and the wider
          community.
          <br />
          <button
            style={{
              fontSize: "15px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#0071c2",
              color: "white",
              position: "absolute",
              right: "10px",
              bottom: "10px",
              cursor: "pointer",
            }}
            onClick={toggleModal}
          >
            Close
          </button>
        </p>
      </Modal>
    </div>
  );
};

export default Header;
