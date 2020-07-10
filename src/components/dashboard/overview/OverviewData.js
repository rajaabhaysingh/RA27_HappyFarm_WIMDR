const OverviewData = {
  //   data: [
  //     { key: "Total", param1: 3454.88, param2: 560.0 },
  //     { key: "transLastMonth", param1: 323.8, param2: 0.0 },
  //     { key: "prodExchanged", param1: 432, param2: 23 },
  //     { key: "community", param1: 0, param2: 34 },
  //   ],
  // data format demo
  transTotal: {
    sold: 3454.88,
    buy: 560.0,
  },
  transLastMonth: {
    sold: 323.8,
    buy: 0,
  },
  prodExchanged: {
    sold: 432,
    buy: 23,
  },
  community: {
    followers: 0,
    following: 34,
  },
  //   first label will be month of joining
  doj: "Dec'19",
  labels: [
    "Jan'20",
    "Feb'20",
    "Mar'20",
    "Apr'20",
    "May'20",
    "Jun'20",
    "Jul'20",
  ],
  dataSet: {
    dataSales: [0, 0, 33, 45, 76, 66, 32, 12],
    dataBuy: [0, 65, 59, 80, 81, 56, 55, 40],
  },
};

export default OverviewData;
