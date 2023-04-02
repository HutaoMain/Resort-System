import Header from "../../components/header/Header.jsx";
import "./Home.css";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
// import { WarningAmber } from "@mui/icons-material";
// import FlippingCards from "../../components/flippingCards/FlippingCards.jsx";
// import Cards from "../../components/cards/Cards.jsx";
// import EntranceRate from "../../components/entranceRate/EntranceRates.jsx";
import Amenities from "../../components/amenities/Amenities.jsx";
// import Promotion from "../promotion/Promotion.jsx";

const Home = () => {
  return (
    <div className="home">
      <div className="home-image-container">
        <div className="home-image">
          <div className="home-image-text-container">
            <p className="home-image-text-header">Enjoy Your Dream Vacation</p>
            <br />
            <p className="home-image-text-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="home-header-search-bar">
          <Header />
        </div>
      </div>

      <div className="scroll-container">
        <div className="scroll-field">
          <div className="scroll-mouse"></div>
        </div>
      </div>

      {/* <div className="home-amenities"> */}
      <Amenities />
      {/* </div> */}

      {/* <div id="reservation"></div>
      <span className="homeEntranceRateTitle">Packages / Rates</span>
      <div id="entranceRate"></div> */}
      {/* <Cards />
      <EntranceRate /> */}
      {/* <br />
      <WarningAmber className="warningAmberIcon" />
      <div id="pleaseRead"></div>
      <h1>Please Read</h1>
      <FlippingCards />
      <div id="map"></div> */}
      <div className="home-google-map-container">
        <h1 className="home-google-map-title">You can find us here</h1>
        <iframe
          className="google-map"
          title="angatBulacan"
          src="https://maps.google.com/maps?q=Barangay%20Pulong%20Yantok%20Sentinela%20Road%20Angat,%20Bulacan&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
      <MailList />
      {/* <div id="contacts"></div> */}
      <Footer />
    </div>
    // </div>
  );
};

export default Home;
