import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/users/email/${user}`
  );

  console.log(data);

  return (
    <div className="profile">
      <div className="profile-container">
        <section className="profile-left">
          {/* <div className="profile-innerbox"> */}
          <img
            className="profile-image"
            src={data?.picture || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"}
            alt="profile"
          />
          <div className="profile-section-profile-details">
            <span className="profile-details-label">Profile Details</span>
            <div className="profile-horizontal-line"></div>
          </div>
          <span className="profile-detail-list">
            Name: {data?.lastName}, {data?.firstName}
          </span>
          <span className="profile-detail-list">
            Phone Number: {data?.phoneNumber}
          </span>
          <span className="profile-detail-list">
            Birthday: {data?.birthday}
          </span>
          <div className="profile-detail-list">
            <input type="password" />
            <input type="password" />
          </div>
          {/* </div> */}
        </section>
        <section className="profile-right">Right</section>
      </div>
    </div>
  );
};

export default Profile;
