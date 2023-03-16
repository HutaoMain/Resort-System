import React from "react";
import "./ModalDiscover.css";

const ModalDiscover = ({ closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="popup-content">
          <span>
            ADVISORY <br /> Guest coming from Manila[South] are advised to take
            NLEX Philippine Arena Exit, this is to avoid heavy traffic at Bocaue
            exit. Guest are advised to use big car to avoid break down in rough
            road. IMPORTANT REMINDERS TO OUR VALUED GUESTS.. - Guest may bring
            in their food, but please use plastic containers or disposable ones.
            (beverages are available inside the resort). - Observe proper waste
            disposal - Please take care of your belongings, most specially your
            slippers and bags. - FIRST COME FIRST SERVE policy is applied on all
            open cottages - For online reservations, at least 50% of the desired
            rooms, or cottage should be paid. RULES AND REGULATION... Please
            wear proper swimming attire when using the pool, colored shirts are
            strictly phrohibited. Swimming Attire Male: Garterized / Cycling
            shorts, Trunks, White shirt Female: Bathing suits, Cycling shorts,
            White shirt - Diving is not allowed at the pool area. No back diving
            off the edge of the pool or any unsafe activities - Persons with
            colds, skin diseases or contagious diseases will not be allowed in
            the pool. - Children must be closely supervised by adults. For
            inquiries and reservation please contact us. 📞 (0915) 941 8257
            https://www.facebook.com/johnmikoplaceresort
          </span>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDiscover;
