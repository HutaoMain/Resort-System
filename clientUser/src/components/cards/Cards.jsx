import "./Cards.css";
import nipaHut from "../../images/nipaHut.jpg";
import picnicTable from "../../images/picnicTable.jpg";
import functionHall from "../../images/functionHall.jpg";

const Cards = () => {
  return (
    <div className="cardComponentContainer">
      <div className="cardComponent">
        <img src={nipaHut} alt="holder" className="cardComponentImg" />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Nipa Hut</h3>
            <p className="cardComponentText">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p className="cardComponentPrice">P500</p>
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img src={nipaHut} alt="holder" className="cardComponentImg" />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Room</h3>
            <p className="cardComponentText">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p className="cardComponentPrice">P3500 - 8500</p>
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img src={picnicTable} alt="holder" className="cardComponentImg" />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Picnic Table</h3>
            <p className="cardComponentText">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p className="cardComponentPrice">P300</p>
          </div>
        </div>
      </div>

      <div className="cardComponent">
        <img src={functionHall} alt="holder" className="cardComponentImg" />
        <div className="cardComponentContainer">
          <div>
            <h3 className="cardComponentTitle">Function Hall</h3>
            <p className="cardComponentText">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p className="cardComponentPrice">P2000 - 5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
