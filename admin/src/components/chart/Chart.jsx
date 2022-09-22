import "./chart.scss";

const Chart = () => {
  return (
    <div className="chart">
      <div className="title">Monthly Chart</div>
      <iframe
        width="1010"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-fumzw/embed/charts?id=62e944e6-12d2-44dd-8614-41ca7cf4cbe3&maxDataAge=60&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
};

export default Chart;
