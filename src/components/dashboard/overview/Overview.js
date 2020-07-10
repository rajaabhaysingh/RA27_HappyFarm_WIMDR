import React, { memo } from "react";
import "./Overview.css";

import { Bar, Line, Pie, Area } from "react-chartjs-2";

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
  const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
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
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    },
    optionsLeft = {
      layout: {
        padding: {
          right: 8,
        },
      },
    },
    optionsRight = {
      layout: {
        padding: {
          left: 8,
        },
      },
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
        <div className="overview_stats_heading">STATISTICS</div>
        <div className="overview_charts">
          <Line options={optionsLeft} data={data} />
          <Bar options={optionsRight} data={data} />
        </div>
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
              border: "1px solid #FFFBEF",
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
