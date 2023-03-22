import useFetch from "../../hooks/useFetch";
import { UrlPath } from "../../UrlPath";

import "./Profile.css";

const Profile = () => {
  const { userData } = useFetch(`${UrlPath}/auth/user`);

  // const { data } = useFetch(`${UrlPath}/users/email/${userData.email}`);

  console.log(userData);

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-innerbox">
            <img src={"https://i.ibb.co/MBtjqXQ/no=avatar.gif"} alt="profile" />
            <span>Name: {userData?.email}</span>
          </div>
        </div>
        <div className="profile-right">Right</div>
      </div>
    </div>
  );
};

export default Profile;
