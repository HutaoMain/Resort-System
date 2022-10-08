import React from "react";
import "./ViewService.css";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";

const ViewService = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const { data, loading } = useFetch(`/services/find/${id}`);

  return (
    <div className="viewService">
      <Sidebar />
      <div className="viewServiceContainer">
        <Navbar />
        <div className="viewServiceContainerLeft">
          <div className="viewServiceContainerUpper">
            {data.photo?.map((photo, i) => (
              <div className="viewServiceImgWrapper" key={i}>
                <img
                  src={photo}
                  alt="Service Photo"
                  className="viewServiceImg"
                />
              </div>
            ))}
          </div>
          <div className="viewServiceDetails">
            What Service:<h1>{data.name}</h1>
            <br />
            What Type: <h2>{data.type}</h2>
            <br />
            Description:{" "}
            <p>
              <b>{data.desc}</b>
            </p>
            {/* <span>Available Units: {data.rooms}</span> */}
            <br />
            <span>
              Price: <b>P{data.cheapestPrice}</b>
            </span>
            <br />
            <br />
            <span>
              Created At: <b>{moment(data.createdAt).format("YYYY-MMM-D")}</b>
            </span>
            <br />
            <br />
            <span>
              Updated At: <b>{moment(data.updatedAt).format("YYYY-MMM-D")}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
