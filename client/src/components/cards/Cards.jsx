import "./Cards.css";
import useFetch from "../../hooks/useFetch.js";
// import Carousel from "react-elastic-carousel";
import { UrlPath } from "../../UrlPath";

const Cards = () => {
  const { data } = useFetch(`${UrlPath}/rooms`);

  return (
    <>
      <div className="cardComponentContainer">
        {data.map((item, key) => {
          return (
            <div key={key} className="cardComponent">
              <div className="cardComponentImageContainer">
                <div className="cardImageContainer">
                  {/* <Carousel>
                    {item.picture?.map((image, keyId) => (
                      <img
                        key={keyId}
                        src={image}
                        alt="holder"
                        className="cardComponentImg"
                      />
                    ))}
                  </Carousel> */}
                </div>
              </div>
              <div className="cardComponentDescription">
                <h3 className="cardComponentTitle">
                  {item.title} (P{item.price})
                </h3>
                <p className="cardComponentText">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>

    /* <div className="cardComponent">
        <img src={room} alt="holder" className="cardComponentImg" />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Rooms (P3500 - 8500)</h3>
            <p className="cardComponentText">
              2 to 14 person capacity. If you are looking for a more intimate
              time with your loved ones, this cute and delightful room is best
              for you.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img
          src="https://res.cloudinary.com/alialcantara/image/upload/v1667533410/upload/rdeybnqfcxvs1ufcl2hu.jpg"
          alt="holder"
          className="cardComponentImg"
        />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Picnic Table (P300)</h3>
            <p className="cardComponentText">
              This type of cottages is good for 6-10 pax it is a outdoor table
              with benches attached, intended for picnicking it is nature
              friendly especially at night.
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img
          src="https://res.cloudinary.com/alialcantara/image/upload/v1667514015/upload/ptm0yil4scnosdeajxzf.jpg"
          alt="holder"
          className="cardComponentImg"
        />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Cabana (P500)</h3>
            <p className="cardComponentText">
              This type of cottage is like small cabin with the capacity of
              10-15 pax. (Each Cabana Small cottage has an electrical power
              socket in charging their cellphone/s and other electronic devices
              allowed inside the facility/resort.)
            </p>
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img
          src={functionHall}
          alt="holder"
          className="cardComponentImg"
          // showNav={false}
          // showThumbnails={false}
          // showFullscreenButton={false}
          // showPlayButton={false}
          // autoPlay={true}
          // slideDuration={100}
        />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Function Hall (P2000 - 5000)</h3>
            <p className="cardComponentText">
              GOOD FOR 20PAX (2000) GOOD FOR 70 TO 80 (5000) - a function hall,
              or reception hall, is a special purpose room, or a building, used
              for hosting large social and business events.
            </p>
            <br />
          </div>
        </div>
      </div> 
    </div>*/
  );
};

export default Cards;
