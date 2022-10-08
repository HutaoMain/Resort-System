import Header from "../../components/header/Header.jsx";
import "./Home.css";
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
import { Link } from "react-scroll";
import Cards from "../../components/cards/Cards.jsx";

const Home = () => {
  return (
    <div>
      <div className="homeList">
        <Link
          className="homeListItem"
          to="hometo"
          smooth={true}
          duration={70}
          offset={-10}
        >
          <MapsHomeWork />
          <span>Home</span>
        </Link>
        <Link
          className="homeListItem"
          to="about"
          smooth={true}
          duration={70}
          offset={-175}
        >
          <Info />
          <span>About</span>
        </Link>
        <Link
          className="homeListItem"
          to="reservation"
          smooth={true}
          duration={70}
          offset={-220}
        >
          <EventAvailable />
          <span>Reservation</span>
        </Link>
        <Link
          className="homeListItem"
          to="entranceRate"
          smooth={true}
          duration={70}
          offset={-200}
        >
          <RequestQuote />
          <span>Rates</span>
        </Link>
        <Link
          className="homeListItem"
          to="pleaseRead"
          smooth={true}
          duration={70}
          offset={-250}
        >
          <MarkChatRead />
          <span>Please Read</span>
        </Link>
        <Link
          className="homeListItem"
          to="map"
          smooth={true}
          duration={70}
          offset={-100}
        >
          <AddLocationAlt />
          <span>Map</span>
        </Link>
        <Link
          className="homeListItem"
          to="contacts"
          smooth={true}
          duration={70}
          offset={-10}
        >
          <AddIcCall />
          <span>Contacts</span>
        </Link>
      </div>

      <div id="hometo">
        <ImageSlider className="imageSlider" slides={SliderData} />
      </div>
      <div className="homeContainer">
        <div id="about">
          <Header />
        </div>
        <div id="reservation"></div>
        <span className="homeEntranceRateTitle">Packages / Rates</span>
        <div id="entranceRate"></div>
        <Cards />
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
