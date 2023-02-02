import "./SearchedItem.css";
import { Link } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
// import { useEffect, useContext, useState } from "react";
// import useFetch from "../../hooks/useFetch";

const SearchedItem = ({ item }) => {
  // const { dates } = useContext(SearchContext);

  // const getDatesInRange = (startDate, endDate) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);

  //   const date = new Date(start.getTime());

  //   const dates = [];

  //   while (date <= end) {
  //     dates.push(new Date(date).getTime());
  //     date.setDate(date.getDate() + 1);
  //   }
  //   return dates;
  // };

  // const alldates = getDatesInRange(dates?.[0]?.startDate, dates?.[0]?.endDate);

  // const isAvailable = (roomNumber) => {
  //   const isFound = roomNumber.unavailableDates.some((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );
  //   return !isFound;
  // };

  // const [allDatesInsideRoom, setAllDatesInsideRoom] = useState([]);

  // const { data } = useFetch(
  //   `https://johnmiko-backend.herokuapp.com/rooms/${item._id}`
  // );

  // useEffect(() => {
  //   setAllDatesInsideRoom(data.roomNumbers?.[0]?.unavailableDates);
  // });

  // console.log(allDatesInsideRoom);

  return (
    <div className="search-item">
      <div className="search-item-container">
        <img src={item?.picture[0]} alt="" className="siImg" />

        <div className="siDesc">
          <h1 className="siTitle">{item.title}</h1>
          {/* <span className="siSubtitle">
          Studio Apartment with Air Conditioning
        </span> */}
          {/* <span style={{ fontSize: "10px" }}> ID:{item._id}</span> */}
          <span className="siFeatures">{item.desc}</span>
          <span className="siCancelOp">Free cancellation</span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          {/* {item.rating && ( */}
          <div className="siRating">
            <span>Excellent</span>
            {/* <button>{item.rating}</button> */}
          </div>
          {/* )} */}
          <div className="siDetailText">
            <span className="siPrice">PHP {item.price}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/rooms/${item._id}`}>
              <button className="siCheckButton">See availability</button>
              {/* disabled={!isAvailable(allDatesInsideRoom)} */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
