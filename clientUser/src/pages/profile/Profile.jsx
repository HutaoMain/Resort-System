import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-innerbox">
            <img
              src={
                user.picture?.data?.url ||
                user?.picture ||
                "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
              }
              alt="profile"
            />
            <span>
              Name: {user.lastName}, {user.firstName}
            </span>
          </div>
        </div>
        <div className="profile-right">Right</div>
      </div>
    </div>
  );
};

export default Profile;
