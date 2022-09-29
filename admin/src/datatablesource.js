import moment from "moment";

export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "user",
    headerName: "User",
    width: 230,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  // {
  //   field: "isAdmin",
  //   operatorValue: "contains",
  //   value: "false",
  // },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
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

export const serviceColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 175,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "desc",
    headerName: "Description",
    width: 230,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "cheapestPrice",
    headerName: "Cheapest Price",
    width: 230,
    headerAlign: "center",
    align: "center",
  },
];

export const roomColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "title",
    headerName: "Name",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 110,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "desc",
    headerName: "Description",
    width: 230,
    headerAlign: "center",
    align: "center",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export const reservationsColumn = [
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
    valueGetter: (params) => moment(params?.row.createdAt).format("YYYY-MMM-D"),
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <>
          <select
            className={`cellWithStatus `}
            defaultValue={params.row.status}
          >
            <option value="Approved" style={{ color: "green" }}>
              Approved
            </option>
            <option value="Pending" style={{ color: "goldenrod" }}>
              Pending
            </option>
            <option value="Rejected" style={{ color: "crimson" }}>
              Rejected
            </option>
          </select>
        </>
      );
    },
  },
];
