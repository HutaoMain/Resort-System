import "./EntranceRates.css";
import Table from "react-bootstrap/Table";

const EntranceRate = () => {
  return (
    <div className="entranceRate">
      <div className="entranceRateTable">
        <span className="adultH1">Adult</span>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Entrance</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Day Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Night Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Overnight Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="entranceRateTable">
        <span className="childH1">Child</span>
        <table>
          <thead>
            <tr>
              <th>Entrance</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Day Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Night Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Overnight Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="entranceRateTable">
        <span className="seniorH1">Senior Citizen</span>
        <table>
          <thead>
            <tr>
              <th>Entrance</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Day Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Night Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
            <tr>
              <td>Overnight Swimming</td>
              <td>P10</td>
              <td>P10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntranceRate;
