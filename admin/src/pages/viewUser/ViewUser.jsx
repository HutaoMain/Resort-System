import "./ViewUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { UrlPath } from "../../UrlPath";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const { data } = useFetch(`${UrlPath}/users/${id}`);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                alt="User"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Username: {data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
