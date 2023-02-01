import "./SinglePage.css";
// import Header from "../../components/header/Header.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {
  LocationOn,
  // ArrowCircleLeft,
  // ArrowCircleRight,
  // TransitEnterexit,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/reserve/Reserve";
import { UrlPath } from "../../UrlPath";

const SinglePage = ({ user }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // const [slideNumber, setSlideNumber] = useState(0);
  // const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`${UrlPath}/rooms/${id}`);

  const { dates } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  days = days + 1;

  // const handleOpen = (i) => {
  //   setSlideNumber(i);
  //   setOpen(true);
  // };

  // const handleMove = (direction) => {
  //   let newSlideNumber;
  //   if (direction === "l") {
  //     newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
  //   } else {
  //     newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
  //   }
  //   setSlideNumber(newSlideNumber);
  // };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    }
  };

  const totalPrice = days * data.price;

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="hotelContainer">
            {/* {open && (
              <div className="slider">
                <TransitEnterexit
                  className="sliderCloseBtn"
                  onClick={() => setOpen(false)}
                />
                <ArrowCircleLeft
                  className="sliderArrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photo[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <ArrowCircleRight
                  className="sliderArrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )} */}
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{data.title}</h1>
              <div className="hotelAddress">
                <LocationOn />
                <span>Angat Bulacan</span>
              </div>
              <span className="hotelPriceHighlight">
                Book a stay over PHP {data.price}
              </span>
              <div className="hotelImages">
                {data.picture?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      // onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>

                  <h2>
                    <b>PHP {totalPrice}</b> - {days} night(s)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
          {openModal && (
            <Reserve setOpen={setOpenModal} totalprice={totalPrice} />
          )}
        </>
      )}
    </div>
  );
};

export default SinglePage;
