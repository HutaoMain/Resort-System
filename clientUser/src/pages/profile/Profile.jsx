import useFetch from "../../hooks/useFetch";
import { UrlPath } from "../../UrlPath";

import "./Profile.css";

const Profile = () => {
  const { userData } = useFetch(`${UrlPath}/auth/user`);

  console.log(userData);

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-innerbox">
            <img src={"https://i.ibb.co/MBtjqXQ/no=avatar.gif"} alt="profile" />
            <span>Name: {userData?.fullName}</span>
          </div>
        </div>
        <div className="profile-right">Right</div>
      </div>
    </div>
  );
};

export default Profile;
