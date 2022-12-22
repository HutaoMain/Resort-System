import "./datatable.scss";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { UrlPath } from "../../UrlPath";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);

  const { data, loading } = useFetch(`${UrlPath}/${path}`);

  // const isAdmin = data.filter((item) => item.isAdmin !== true);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${UrlPath}/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  console.log(data);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "left",
      width: 230,
      renderCell: (params) => {
        return (
          <>
            {params.row.isAdmin !== true ? (
              <div className="cellAction">
                {location.pathname === "/rooms" && (
                  <Link
                    to={`/${path}/view/${params.row._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="btns">View</div>
                  </Link>
                )}
                {location.pathname !== "/users" && (
                  <Link
                    to={`/${path}/update/${params.row._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="btns">Edit</div>
                  </Link>
                )}
                {location.pathname !== "/users" ? (
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(params.row._id)}
                  >
                    Delete
                  </div>
                ) : (
                  <></>
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="pathTitle">
          {location.pathname === "/rooms" ? "Facilities" : path}
        </h1>
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
        <div class="dataTableLoading"></div>
      ) : (
        <DataGrid
          getRowId={(row) => row._id}
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={20}
          rowsPerPageOptions={[9]}
          getRowClassName={(params) => `rowBackground${params.row.status}`}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      )}
    </div>
  );
};

export default Datatable;
