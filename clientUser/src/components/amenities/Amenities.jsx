import "./Amenities.css";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import {
  Pool,
  SportsBasketball,
  SupportAgent,
  LocalParking,
  NetworkWifi,
} from "@mui/icons-material";

const Amenities = () => {
  return (
    <div className="amenities">
      <div className="amenities-left">
        <h1>Resort Amenities</h1>
        <p className="amenities-left-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <div className="amenities-left-list">
          <span className="amenities-left-list-item">
            <Pool className="amenities-icon" /> Infinity Pool
          </span>
          <span className="amenities-left-list-item">
            <SportsBasketball className="amenities-icon" /> Basketball Court
          </span>
          <span className="amenities-left-list-item">
            <SupportAgent className="amenities-icon" /> 24 Hrs Service Desk
          </span>
          <span className="amenities-left-list-item">
            <LocalParking className="amenities-icon" /> Free Parking
          </span>
          <span className="amenities-left-list-item">
            <NetworkWifi className="amenities-icon" /> Free Wifi
          </span>
        </div>
      </div>
      <div className="amenities-right">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Amenities;
