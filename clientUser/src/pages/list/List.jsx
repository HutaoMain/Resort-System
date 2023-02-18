import "./List.css";
// import Header from "../../components/header/Header.jsx";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
import SearchedItem from "../../components/searchedItem/SearchedItem";
import useFetch from "../../hooks/useFetch";
import { UrlPath } from "../../UrlPath";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

// import { FcHome, FcInTransit } from "react-icons/fc";

const List = () => {
  const [selectedOption, setSelectedOption] = useState("default");

  const { data } = useFetch(`${UrlPath}/rooms`);

  const sortItems = () => {
    switch (selectedOption) {
      case "alphabetically":
        return data.sort((a, b) => (a.title > b.title ? 1 : -1));
      case "byPrice":
        return data.sort((a, b) => (a.price > b.price ? 1 : -1));
      // case "byDate":
      //   return data.sort((a, b) => (a.date > b.date ? 1 : -1));
      default:
        return data;
    }
  };

  return (
    <div className="listWrapper">
      <div className="listResult">
        {/* <span style={{ fontSize: "20px" }}>Categories</span>
        <div className="list-filter-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FcHome
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                padding: "20px",
                fontSize: "30px",
              }}
            />
            <span>Apartment</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FcInTransit
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                padding: "20px",
                fontSize: "30px",
              }}
            />
            <span>Transit</span>
          </div>
        
        </div> */}
        <div className="list-dropdown-container">
          <select
            className="list-dropdown"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="byPrice">By Price</option>
            {/* <option value="byDate">By Date</option> */}
          </select>
        </div>
        {sortItems().map((item) => (
          <SearchedItem item={item} key={item._id} />
        ))}
      </div>
      <MailList />

      <Footer />
    </div>
  );
};

export default List;
