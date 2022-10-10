import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);
  const [reservation, setReservation] = useState("");
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://api.johnmikoresort.store/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  //axios update reservation
  const handleUpdateReservation = async (id) => {
    try {
      await axios.put(
        `http://api.johnmikoresort.store/reservations/${id}`,
        reservation.status
      );
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.username !== "markanthony123" ? (
              <div className="cellAction">
                {location.pathname === "/services" && (
                  <Link
                    to={`/${path}/view/${params.row._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="viewButton">View</div>
                  </Link>
                )}
                {location.pathname !== "/users" && (
                  <Link
                    to={`/${path}/update/${params.row._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="viewButton">Edit</div>
                  </Link>
                )}
                {location.pathname !== "/reservations" ? (
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(params.row._id)}
                  >
                    Delete
                  </div>
                ) : (
                  <div
                    className="viewButton"
                    onClick={() => handleUpdateReservation(params.row._id)}
                  >
                    Update
                  </div>
                )}
              </div>
            ) : (
              "Admin"
            )}
          </>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="pathTitle">{path}</h1>
        <h4 className="datatableHover">
          Please hover to header below to filter and sort data
        </h4>
        {location.pathname !== "/users" &&
          location.pathname !== "/reservations" && (
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          )}
      </div>
      {loading ? (
        "loading"
      ) : (
        <DataGrid
          getRowId={(row) => row?._id}
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

export default Datatable;
