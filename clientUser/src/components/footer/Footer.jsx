import "./Footer.css";
import {
  BsFacebook,
  BsInstagram,
  BsMailbox,
  BsFillTelephoneFill,
  BsPinterest,
  BsTwitter,
  BsFillHouseDoorFill,
} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="fLists"></div>
      <div className="fText">
        Copyright ©2022 John Miko's Place Resort™. All rights reserved.
      </div> */}
      <div className="footer-left">
        <div className="footer-logo-container">
          ALI TRIP RESORT
          <img
            src="https://images-platform.99static.com//0Fw82z5YzhIild8D3PoCQ0-4yjc=/180x16:806x642/fit-in/500x500/99designs-contests-attachments/102/102362/attachment_102362691"
            alt="sti logo"
            style={{
              height: "60px",
              width: "auto",
              marginLeft: "5px",
            }}
          />
        </div>
        <div className="footer-description">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </div>
        <div className="footer-social-container">
          <div className="footer-social-icon" style={{ color: "3B5999" }}>
            <BsFacebook />
          </div>
          <div className="footer-social-icon" style={{ color: "E4405F" }}>
            <BsInstagram />
          </div>
          <div className="footer-social-icon" style={{ color: "55ACEE" }}>
            <BsTwitter />
          </div>
          <div className="footer-social-icon" style={{ color: "E60023" }}>
            <BsPinterest />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <h3 className="footer-center-title">Useful Links</h3>
        <ul className="footer-center-list">
          <li className="footer-center-list-item">Home</li>
          <li className="footer-center-list-item">Cart</li>
          <li className="footer-center-list-item">Accessories</li>
          <li className="footer-center-list-item">My Account</li>
          <li className="footer-center-list-item">Order Tracking</li>
          <li className="footer-center-list-item">Wishlist</li>
          <li className="footer-center-list-item">Terms</li>
        </ul>
      </div>
      <div className="footer-right">
        <h3>Contact</h3>
        <div className="footer-contact-item">
          <BsFillHouseDoorFill style={{ marginRight: "10px" }} /> Sta. Maria
          Bulacan, 3022
        </div>
        <div className="footer-contact-item">
          <BsFillTelephoneFill style={{ marginRight: "10px" }} /> +1 234 567
        </div>
        <div className="footer-contact-item">
          <BsMailbox style={{ marginRight: "10px" }} /> contact@rimsti.ph
        </div>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </div>
    </div>
  );
};

export default Footer;
