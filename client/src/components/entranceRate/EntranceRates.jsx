import "./EntranceRates.css";

const EntranceRate = () => {
  return (
    <>
      <span style={{ color: "red" }}>
        <b>
          This price is excluded in the reservation --- payment will be charge
          once you arrived at resort.
        </b>
      </span>
      <div className="entranceRate">
        <div className="entranceRateTable">
          <span className="adultH1">Adult</span>
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
                <td>7:00AM to 5:00PM</td>
                <td>P150</td>
              </tr>
              <tr>
                <td>Night Swimming</td>
                <td>5:00PM to 12:00AM</td>
                <td>P180</td>
              </tr>
              <tr>
                <td>Overnight Swimming</td>
                <td>5:00PM to 7:00AM</td>
                <td>P180</td>
              </tr>
            </tbody>
          </table>
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
                <td>7:00AM to 5:00PM</td>
                <td>P100</td>
              </tr>
              <tr>
                <td>Night Swimming</td>
                <td>5:00PM to 12:00AM</td>
                <td>P100</td>
              </tr>
              <tr>
                <td>Overnight Swimming</td>
                <td>5:00PM to 7:00AM</td>
                <td>P100</td>
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
                <td>7:00AM to 5:00PM</td>
                <td>P100</td>
              </tr>
              <tr>
                <td>Night Swimming</td>
                <td>5:00PM to 12:00AM</td>
                <td>P100</td>
              </tr>
              <tr>
                <td>Overnight Swimming</td>
                <td>5:00PM to 7:00AM</td>
                <td>P100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EntranceRate;
