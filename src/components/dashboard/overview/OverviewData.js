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
  dataSales: {
    labels: ["", "", ""],
  },
};

export default OverviewData;
