import "./SearchedItem.css";
import { Link } from "react-router-dom";
import useFormContext from "../../hooks/useFormContext";

const SearchedItem = ({ item }) => {
  const { setPage } = useFormContext();

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="search-item">
      <div className="search-item-container">
        <img src={item?.picture[0]} alt="" className="siImg" />

        <div className="siDesc">
          <h1 className="siTitle">{item.title}</h1>
          <span className="siFeatures">{item.desc}</span>
          <span className="siCancelOp">Free cancellation</span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
          </div>

          <div className="siDetailText">
            <span className="siPrice">PHP {item.price}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/rooms/${item._id}`}>
              <button className="siCheckButton" onClick={handleNext}>
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
