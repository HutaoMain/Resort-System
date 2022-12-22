import moment from "moment";

export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "user",
    headerName: "Customer Name",
    width: 340,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    headerAlign: "left",
    align: "left",
  },
];

export const roomColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "title",
    headerName: "Name",
    width: 150,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 110,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "desc",
    headerName: "Description",
    width: 230,
    headerAlign: "left",
    align: "left",
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
    headerAlign: "left",
    align: "left",
    width: 250,
  },
  {
    field: "email",
    headerName: "Customer Email",
    headerAlign: "left",
    align: "left",
    width: 230,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    headerAlign: "left",
    align: "left",
    width: 230,
  },
  {
    field: "rooms",
    headerName: "Facility",
    headerAlign: "left",
    align: "left",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Price",
    headerAlign: "left",
    align: "left",
    type: "number",
    width: 100,
    valueGetter: ({ value }) => currencyFormatter.format(value),
  },
  {
    field: "startDate",
    headerName: "Start Date",
    headerAlign: "left",
    align: "left",
    width: 200,
    valueGetter: (params) =>
      moment(params?.row.dateRange?.[0]?.startDate).format("YYYY-MMM-D"),
  },
  {
    field: "endDate",
    headerName: "End Date",
    headerAlign: "left",
    align: "left",
    width: 200,
    valueGetter: (params) =>
      moment(params?.row.dateRange?.[0]?.endDate).format("YYYY-MMM-DD"),
  },
  {
    field: "updatedAt",
    type: "date",
    headerName: "Date Updated",
    headerAlign: "left",
    align: "left",
    width: 200,
    valueGetter: (params) => moment(params?.row.updatedAt).format("YYYY-MMM-D"),
  },
  {
    field: "roomNumberName",
    headerName: "Facility Number",
    headerAlign: "left",
    align: "left",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
