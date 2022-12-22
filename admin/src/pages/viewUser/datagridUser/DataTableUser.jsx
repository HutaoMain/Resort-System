import "./DataTableUser.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import useFetch from "../../../hooks/useFetch";

const DataTableUser = () => {
  const { data, loading } = useFetch(`${UrlPath}/reservations`);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerAlign: "center",
      align: "center",
      width: 230,
    },
    {
      field: "service",
      headerName: "Service",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 100,
      valueGetter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerAlign: "center",
      align: "center",
      width: 200,
      valueGetter: (params) =>
        moment(params?.row.dateRange[0]?.startDate).format("YYYY-MMM-D"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      width: 200,
      valueGetter: (params) =>
        moment(params?.row.dateRange[0]?.endDate).format("YYYY-MMM-DD"),
    },
    {
      field: "createdAt",
      type: "date",
      headerName: "Date Created",
      headerAlign: "center",
      align: "center",
      width: 200,
      valueGetter: (params) =>
        moment(params?.row.createdAt).format("YYYY-MMM-D"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTableUser">
      {loading ? (
        "loading"
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(rows) => rows._id}
        />
      )}
    </div>
  );
};

export default DataTableUser;
