import "./List.css";
import Header from "../../components/header/Header.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchedItem from "../../components/searchedItem/SearchedItem";
import useFetch from "../../hooks/useFetch";
// import moment from "moment";
// import DatePicker from "react-datepicker";

const List = () => {
  const location = useLocation();

  const [dates, setDates] = useState(location.state.dates);
  const [checkedBox1, setCheckedBox1] = useState(location.state.checkedBox1);
  const [checkedBox2, setCheckedBox2] = useState(location.state.checkedBox2);
  const [checkedBox3, setCheckedBox3] = useState(location.state.checkedBox3);

  // const [products, setProducts] = useState(
  //   {
  //     name: String,
  //     amount: Number,
  //     selected: Boolean,
  //   },
  //   []
  // )([
  //   {
  //     name: "Checkbox1",
  //     amount: 1000,
  //     selected: false,
  //   },
  //   {
  //     name: "Checkbox2",
  //     amount: 1400,
  //     selected: false,
  //   },
  //   {
  //     name: "Checkbox3",
  //     amount: 12300,
  //     selected: false,
  //   },
  // ]);

  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/services?min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="listItem">
              <label>What time you want to avail?</label>
              <label>8:00AM to 5:00PM</label>
              <input
                type="checkbox"
                name="checkbox1"
                defaultChecked={checkedBox1}
                value={1}
              />
              <label>6:00PM to 12:00AM</label>
              <input
                type="checkbox"
                name="checkbox2"
                defaultChecked={checkedBox2}
                value={1}
              />
              <label>6:00PM to 6:00AM</label>
              <input
                type="checkbox"
                name="checkbox3"
                defaultChecked={checkedBox3}
                value={1}
              />
            </div>

            <div className="listItem">
              <label>Options</label>
              <div className="listOptions">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="listOptionInput"
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="listOptionInput"
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="listOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchedItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
