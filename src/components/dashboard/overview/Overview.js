import React, { memo, useState, useEffect, lazy, Suspense } from "react";
import "./Overview.css";

import { Line } from "react-chartjs-2";

import FallbackLazy from "../../FallbackLazy";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";

const SellingNowItem = lazy(() => import("./SellingNowItem"));

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

function Overview({ OverviewData, SellingNowData, MyOrdersData }) {
  // utility function
  // tstampToTime
  const tstampToTime = (ts) => {
    const tsDate = new Date(ts * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      tsDate.getDate() +
      " " +
      months[tsDate.getMonth()] +
      " " +
      tsDate.getFullYear() +
      ",  " +
      tsDate.getHours() +
      ":" +
      tsDate.getMinutes() +
      ":" +
      tsDate.getSeconds()
    );
  };

  // charts data state management
  const [dataSales, setDataSales] = useState([]);
  const [dataBuy, setDataBuy] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  let tempSalesDataSet = [];
  let tempBuyDataSet = [];
  let labels = [OverviewData.doj];

  // renderProdOnSale
  const renderProdOnSale = (prodList) => {
    if (prodList) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<FallbackLazy />}>
            {prodList.map((item) => (
              <SellingNowItem
                tstampToTime={tstampToTime}
                key={item.id}
                item={item}
              />
            ))}
          </Suspense>
        </ErrorBoundary>
      );
    } else {
      return (
        <div className="overview_no_prod_found">
          {" "}
          No products found under this category.
        </div>
      );
    }
  };

  // renderOrderStatus
  const renderOrderStatus = (order) => {
    if (order.st === 1) {
      return (
        <span style={{ color: "#009900" }}>
          <i className="fas fa-check-circle"></i> {order.desc}
        </span>
      );
    } else if (order.st === 2) {
      return (
        <span style={{ color: "#ee5700" }}>
          <i className="fas fa-exclamation-triangle"></i> {order.desc}
        </span>
      );
    } else if (order.st === 0) {
      return (
        <span style={{ color: "#cc0000" }}>
          <i className="fas fa-times-circle"></i> {order.desc}
        </span>
      );
    } else {
      return (
        <span style={{ color: "#5c5c5c" }}>
          <i className="fas fa-info-circle"></i> {order.desc}
        </span>
      );
    }
  };

  // renderOrders
  const renderOrders = () => {
    if (MyOrdersData.orH) {
      return (
        <>
          {MyOrdersData.orH.map((order) => (
            <div key={order.oid} className="overview_order_container">
              <img src={order.img} alt="" />
              <div className="overview_order_name_desc">
                <div className="overview_order_name">
                  {order.pn}, {order.qty} {order.qtU}
                </div>
                <div className="overview_order_desc">
                  {renderOrderStatus(order)}
                </div>
              </div>
              <div className="overview_spacer"></div>
              <div className="overview_order_time">
                {tstampToTime(order.ts)}
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <div className="overview_no_prod_found">
          {" "}
          No order history available.
        </div>
      );
    }
  };

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
        pointBorderColor: "rgba(108, 0, 170, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(108, 0, 170, 1)",
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
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
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
        <div className="overview_stats_heading">MY SALES</div>
        <div className="overview_products_sold">
          <div className="overview_sub_heading">Retail products on sale</div>
          <div className="overview_retail_products">
            {renderProdOnSale(SellingNowData.retail)}
          </div>
          <div className="overview_sub_heading">Bulk products on sale</div>
          <div className="overview_retail_products">
            {renderProdOnSale(SellingNowData.bulk)}
          </div>
        </div>
        <div className="overview_stats_heading">MY ORDERS</div>
        <div className="overview_description">Your recent orders.</div>
        <div className="overview_products_purchased">{renderOrders()}</div>
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
