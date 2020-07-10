import React, { memo, useState, useEffect } from "react";
import "./Overview.css";

import { Line } from "react-chartjs-2";

export function OverviewStatBox({
  heading,
  subTop1,
  data1,
  subTop2,
  data2,
  styleWrapper,
  symbol,
}) {
  return (
    <div style={styleWrapper} className="overview_stats_box">
      <div className="overview_stat_box_heading">{heading}</div>
      <div className="overview_stat_data">
        {subTop1}:{" "}
        <strong>
          {symbol} {data1}
        </strong>
      </div>
      <div className="overview_stat_data">
        {subTop2}:{" "}
        <strong>
          {symbol} {data2}
        </strong>
      </div>
    </div>
  );
}

function Overview({ OverviewData }) {
  // charts data state management
  const [dataSales, setDataSales] = useState([]);
  const [dataBuy, setDataBuy] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  let tempSalesDataSet = [];
  let tempBuyDataSet = [];
  let labels = [OverviewData.doj];

  useEffect(() => {
    OverviewData.dataSet.dataSales.map((data) => tempSalesDataSet.push(data));
    OverviewData.dataSet.dataBuy.map((data) => tempBuyDataSet.push(data));
    OverviewData.labels.map((label) => labels.push(label));

    setDataSales(tempSalesDataSet);
    setDataBuy(tempBuyDataSet);
    setDataLabels(labels);

    console.log(tempSalesDataSet);
    console.log(tempBuyDataSet);
    console.log(labels);
    // return () => {
    //   cleanup
    // }
  }, [OverviewData]);

  const dataSell = {
    labels: dataLabels,
    datasets: [
      {
        label: "Total sales",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataSales,
      },
    ],
  };

  const dataPurchase = {
    labels: dataLabels,
    datasets: [
      {
        label: "Total Purchase",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(108, 0, 170, 0.4)",
        borderColor: "rgba(108, 0, 170, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(108, 0, 170, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(108, 0, 170, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataBuy,
      },
    ],
  };

  return (
    <div className="overview_main_div">
      <div className="overview_inner_div">
        <div className="overview_heading">Overview</div>
        <div className="overview_description">
          <div className="overview_description_text">
            You can watch your account summary here.
          </div>
          <i className="fas fa-info-circle overview_info_icon"></i>
        </div>
        <div className="overview_stats_heading">ACTIVITY ANALYSIS</div>
        <div className="overview_charts">
          <div className="overview_chart_sell">
            <Line data={dataSell} />
          </div>
          <div className="overview_chart_buy">
            <Line data={dataPurchase} />
          </div>
        </div>
        <div className="overview_stats_heading">STATISTICS</div>
        <div className="overview_stats">
          <OverviewStatBox
            heading={"Transactions"}
            subTop1={"Sold"}
            data1={OverviewData.transTotal.sold}
            subTop2={"Purchased"}
            data2={OverviewData.transTotal.buy}
            styleWrapper={{
              border: "1px solid #ee5700",
              background: "#FFFBEF",
              color: "#ee5700",
            }}
            symbol={"₹"}
          />
          <OverviewStatBox
            heading={"This month"}
            subTop1={"Sold"}
            data1={OverviewData.transLastMonth.sold}
            subTop2={"Purchased"}
            data2={OverviewData.transLastMonth.buy}
            styleWrapper={{
              border: "1px solid #0F4153",
              background: "#ee5700",
              color: "#ffffff",
            }}
            symbol={"₹"}
          />
          <OverviewStatBox
            heading={"Products"}
            subTop1={"Sold"}
            data1={OverviewData.prodExchanged.sold}
            subTop2={"Purchased"}
            data2={OverviewData.prodExchanged.buy}
            styleWrapper={{
              border: "1px solid #ee5700",
              background: "#FA8C16",
              color: "#ffffff",
            }}
            symbol={""}
          />
          <OverviewStatBox
            heading={"Community"}
            subTop1={"Followers"}
            data1={OverviewData.community.followers}
            subTop2={"Following"}
            data2={OverviewData.community.following}
            styleWrapper={{
              border: "1px solid #ee5700",
              background: "#0F4153",
              color: "#ffffff",
            }}
            symbol={""}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Overview);
