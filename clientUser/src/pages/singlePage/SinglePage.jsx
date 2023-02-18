import "./SinglePage.css";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import {
  LocationOn,
  // ArrowCircleLeft,
  // ArrowCircleRight,
  // TransitEnterexit,
  NavigateBefore,
  NavigateNext,
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

  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    }
  };

  const totalPrice = days * data.price;

  // Function to go to the next image
  function nextImage() {
    setCurrentImage((currentImage + 1) % data.picture?.length);
  }

  // Function to go to the previous image
  function previousImage() {
    setCurrentImage(
      (currentImage - 1 + data.picture?.length) % data.picture?.length
    );
  }

  // Function to go to a specific image by its index
  function goToImage(index) {
    setCurrentImage(index);
  }

  console.log(data);

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="hotelContainer">
            <div className="hotelWrapper">
              {/* <div className="hotelImages">
                {data.picture?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img src={photo} alt="" className="hotelImg" />
                  </div>
                ))}
              </div> */}

              {/* <div className="singlepage-image-slider-container"> */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="singlepage-image-slider">
                  <div className="singlepage-image-slider-inner">
                    <img
                      className="singlepage-slider-image"
                      src={data?.picture?.[currentImage]}
                      alt="Slider"
                    />
                  </div>
                  <button
                    onClick={previousImage}
                    className="singlepage-slider-previous-btn"
                  >
                    <NavigateBefore style={{ fontSize: "40px" }} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="singlepage-slider-next-btn"
                  >
                    <NavigateNext style={{ fontSize: "50px" }} />
                  </button>
                </div>

                <div className="singlepage-thumbnail-slider">
                  <div className="singlepage-thumbnail-image-container">
                    {data.picture?.map((image, index, key) => (
                      <img
                        key={key}
                        src={image}
                        alt="Thumbnail"
                        onClick={() => goToImage(index)}
                        className={
                          index === currentImage
                            ? "singlepage-thumbnail-active"
                            : "singlepage-thumbnail"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="hotelTitle">{data.title}</h1>
              <div className="hotelAddress">
                <LocationOn />
                <span>Angat Bulacan</span>
              </div>
              <span className="hotelPriceHighlight">
                Book a stay over PHP {data.price}
              </span>
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
