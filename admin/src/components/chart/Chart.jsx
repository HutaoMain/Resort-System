import "./chart.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import useFetch from "../../hooks/useFetch";
import { UrlPath } from "../../UrlPath";
import { useEffect, useState } from "react";
import moment from "moment";

const Chart = () => {
  const { data } = useFetch(`${UrlPath}/reservations`);

  const [chart, setChart] = useState([]);

  useEffect(() => {
    setChart(data);
  }, [data]);

  ChartJs.register(CategoryScale, LinearScale, BarElement);

  const approved = chart?.filter((data) => data.status === "Approved");

  const [selectedOptionDate, setSelectedOptionDate] = useState("Daily");

  const groupedData = approved?.reduce((acc, item) => {
    let date;
    if (selectedOptionDate === "Daily") {
      date = moment(item.updatedAt).format("YYYY-MMM-D");
    } else if (selectedOptionDate === "Monthly") {
      date = moment(item.updatedAt).format("YYYY-MMM");
    } else if (selectedOptionDate === "Yearly") {
      date = moment(item.updatedAt).format("YYYY");
    }

    const amount = item.amount;

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += amount;

    return acc;
  }, {});

  const graph = {
    label: "Date",
    labels: Object.keys(groupedData),
    // approved?.map((item) =>
    //   moment(item.updatedAt).format("YYYY-MMM-D")
    // ),
    datasets: [
      {
        label: "Total Earned",
        data: Object.values(groupedData),
        // approved?.map((item) => item.amount),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50Af95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  // const options = {
  //   scales: {
  //     xAxes: [
  //       {
  //         type: "time",
  //         time: {
  //           unit: "month",
  //           displayFormats: {
  //             month: "MMM YYYY",
  //           },
  //           min: formattedDate,
  //           max: formattedDate,
  //         },
  //       },
  //     ],
  //   },
  // };

  console.log(selectedOptionDate);

  return (
    <div className="chart">
      <span style={{ fontSize: "15px", marginTop: "50px" }}>
        Select here to filter the Chart:
      </span>
      <select
        className="dateSelector"
        onChange={(e) => setSelectedOptionDate(e.target.value)}
      >
        <option value="Daily">Daily</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <Bar data={graph} />
      <p style={{ color: "gray", textAlign: "center", marginTop: "10px" }}>
        Y-Axis: Total Earned &nbsp; &nbsp; X-Axis: Date
      </p>
    </div>
  );
};

export default Chart;
