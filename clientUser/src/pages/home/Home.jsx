import Header from "../../components/header/Header.jsx";
import "./Home.css";
import EntranceRates from "../../components/entranceRate/EntranceRates.jsx";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ImageSlider from "../../components/imageSlider/ImageSlider.jsx";
import { SliderData } from "../../components/imageSlider/SliderData.jsx";
import { WarningAmber } from "@mui/icons-material";
import FlippingCards from "../../components/flippingCards/FlippingCards.jsx";
import {
  MapsHomeWork,
  Info,
  EventAvailable,
  MarkChatRead,
  AddLocationAlt,
  AddIcCall,
  RequestQuote,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="homeList">
        <a
          className="homeListItem"
          href="#homeHref"
          style={{ textDecoration: "none" }}
        >
          <MapsHomeWork />
          <span>Home</span>
        </a>
        <a
          className="homeListItem"
          href="#about"
          style={{ textDecoration: "none" }}
        >
          <Info />
          <span>About</span>
        </a>
        <a
          className="homeListItem"
          href="#reservation"
          style={{ textDecoration: "none" }}
        >
          <EventAvailable />
          <span>Reservation</span>
        </a>
        <a
          className="homeListItem"
          href="#entranceRate"
          style={{ textDecoration: "none" }}
        >
          <RequestQuote />
          <span>Entrance Rate</span>
        </a>
        <a
          className="homeListItem"
          href="#pleaseRead"
          style={{ textDecoration: "none" }}
        >
          <MarkChatRead />
          <span>Please Read</span>
        </a>
        <a
          className="homeListItem"
          href="#map"
          style={{ textDecoration: "none" }}
        >
          <AddLocationAlt />
          <span>Map</span>
        </a>
        <a
          className="homeListItem"
          href="#contacts"
          style={{ textDecoration: "none" }}
        >
          <AddIcCall />
          <span>Contacts</span>
        </a>
      </div>

      <div id="homeHref">
        <ImageSlider className="imageSlider" slides={SliderData} />
      </div>
      <div className="homeContainer">
        <div id="about">
          <Header />
        </div>
        <div id="reservation"></div>
        <span className="homeEntranceRateTitle">Entrance Rate</span>
        <div id="entranceRate"></div>
        <EntranceRates />
        <br />
        <WarningAmber className="warningAmberIcon" />
        <div id="pleaseRead"></div>
        <h1>Please Read</h1>
        <FlippingCards />
        <div id="map"></div>
        <h1 className="homeTitle">You can find us here</h1>
        <iframe
          className="googleMap"
          width="600"
          height="500"
          src="https://maps.google.com/maps?q=Barangay%20Pulong%20Yantok%20Sentinela%20Road%20Angat,%20Bulacan&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
        <MailList />
        <div id="contacts"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
