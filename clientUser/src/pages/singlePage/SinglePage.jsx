import "./SinglePage.css";
import Header from "../../components/header/Header.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {
  LocationOn,
  ArrowCircleLeft,
  ArrowCircleRight,
  TransitEnterexit,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/reserve/Reserve";

const SingleHotel = ({ user }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/services/find/${id}`);

  const { dates, options, checkedBox1, checkedBox2, checkedBox3 } =
    useContext(SearchContext);

  let c1 = 0,
    c2 = 0,
    c3 = 0;
  if (checkedBox1 === true) {
    c1 = 1;
  }
  if (checkedBox2 === true) {
    c2 = 1;
  }
  if (checkedBox3 === true) {
    c3 = 1;
  }
  let totalChecked = c1 + c2 + c3;
  console.log(totalChecked);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  days = days + 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      alert("You must login first");
    }
  };

  // let additional = 0;
  // if (days > 1) {
  //   additional = additional + 3;
  // }

  const totalPrice =
    days *
    data.cheapestPrice *
    options.room *
    (options.adult + options.children);

  return (
    <div>
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
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
          )}
          <div className="hotelWrapper">
            {/* <button className="bookNow">
            Reserve or Book Now!
          </button> */}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <LocationOn />
              <span>{data.address}</span>
            </div>
            {/* <span className="hotelDistance">
            Excellent location {data.address}m from center
          </span> */}
            <span className="hotelPriceHighlight">
              Book a stay over PHP {data.cheapestPrice} at this {data.type}
            </span>
            <div className="hotelImages">
              {data.photo?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    key={id}
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                  also reproduced in their exact original form, accompanied by
                  English versions from the 1914 translation by H. Rackham.
                </span>
                <h2>
                  <b>PHP {totalPrice}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          serviceid={id}
          totalprice={totalPrice}
        />
      )}
    </div>
  );
};

export default SingleHotel;
