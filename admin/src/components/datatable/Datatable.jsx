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
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  //axios update reservation
  const handleUpdateReservation = async (id) => {
    try {
      await axios.put(`/reservations/${id}`, reservation.status);
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {location.pathname !== "/reservations" && (
              <Link to="/users/test" style={{ textDecoration: "none" }}>
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
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="pathTitle">{path}</h1>
        {location.pathname !== "/users" &&
          location.pathname !== "/reservations" && (
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          )}
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
