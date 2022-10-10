import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import moment from "moment";

const List = () => {
  const { data, loading, error } = useFetch("/reservations");

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? "Loading"
            : data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="tableCell">{item._id}</TableCell>
                  <TableCell className="tableCell">{item.service}</TableCell>
                  <TableCell className="tableCell">
                    {item.customerName}
                  </TableCell>
                  <TableCell className="tableCell">
                    {[
                      moment(item?.dateRange[0].startDate).format("YYYY-MM-DD"),
                      <br />,
                      "to",
                      <br />,
                      moment(item?.dateRange[0].endDate).format("YYYY-MM-DD"),
                    ]}
                  </TableCell>
                  <TableCell className="tableCell">₱{item.amount}</TableCell>
                  <TableCell className={`status ${item.status}`}>
                    {item.status}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
