// This data is for a list of just 1 subdimension, but we would have N subdimensions to graph. (Needs N containers in the UI)

// There is also have a function that converts our pandas dataframe to this format.

// Each item in `graphs` represents the data for a single graph.
// Each graph has the following properties:
//   - title: Title of the graph
//   - y_axis_label: Title of the y-axis
//   - x_axis_label: Title of the x-axis
//   - sub_dimension: The sub-dimension of the graph.
//   - intervals: The confidence interval at a date in the form: [timestamp, low, high]
//   - values: The value at a date in the form: [timestamp, value]
//   - predicted_values: The predicted value at a date in the form: [timestamp, predicted_value]
let graphs = [
  {
    title: "overall KPI using prophet",
    y_axis_label: "Count of D num_purchases",
    x_axis_label: "Datetime",
    sub_dimension: "overall KPI",
    intervals: [
      [1308096000000.0, 962.98, 2005.29],
      [1308182400000.0, 1081.99, 2099.28],
      [1308268800000.0, 709.91, 1746.41],
      [1308355200000.0, -588.81, 459.59],
      [1308441600000.0, 453.81, 1503.35],
      [1308528000000.0, 885.69, 1902.05],
      [1308614400000.0, 1029.53, 2032.85],
      [1308700800000.0, 947.6, 2002.92],
      [1308787200000.0, 1096.91, 2123.59],
      [1308873600000.0, 665.47, 1691.85],
      [1308960000000.0, -560.19, 466.61],
      [1309046400000.0, 457.49, 1498.37],
      [1309132800000.0, 910.85, 1903.85],
      [1309219200000.0, 1028.67, 2037.95],
      [1309305600000.0, 951.45, 1982.99],
      [1309392000000.0, 1061.06, 2097.31],
      [1309478400000.0, 658.44, 1716.27],
      [1309564800000.0, -563.23, 510.17],
      [1309651200000.0, 503.32, 1509.3],
      [1309737600000.0, 904.61, 1949.86],
      [1309824000000.0, 1021.74, 2095.97],
      [1309910400000.0, 1002.2, 1996.78],
      [1309996800000.0, 1071.41, 2085.99],
      [1310083200000.0, 700.84, 1716.82],
      [1310169600000.0, -588.75, 449.15],
      [1310256000000.0, 494.16, 1533.34],
      [1310342400000.0, 922.36, 1913.91],
      [1310428800000.0, 1058.6, 2078.66],
      [1310515200000.0, 997.34, 2052.1],
      [1310601600000.0, 1065.71, 2137.39],
      [1310688000000.0, 720.4, 1749.33],
      [1310774400000.0, -558.07, 524.11],
      [1310860800000.0, 487.46, 1516.5],
      [1310947200000.0, 906.93, 1963.75],
      [1311033600000.0, 1064.5, 2079.95],
      [1311120000000.0, 1006.4, 2002.85],
      [1311206400000.0, 1114.88, 2176.66],
      [1311292800000.0, 750.69, 1762.64],
      [1311379200000.0, -523.64, 482.98],
      [1311465600000.0, 515.46, 1583.62],
      [1311552000000.0, 936.01, 1947.9],
      [1311638400000.0, 1048.26, 2096.28],
      [1311724800000.0, 1024.08, 2070.63],
      [1311811200000.0, 1102.85, 2176.39],
      [1311897600000.0, 737.09, 1783.6],
      [1311984000000.0, -539.53, 493.6],
      [1312070400000.0, 518.49, 1573.89],
      [1312156800000.0, 983.43, 2005.13],
      [1312243200000.0, 1041.45, 2110.48],
      [1312329600000.0, 1042.93, 2069.68],
      [1312416000000.0, 1151.07, 2163.56],
      [1312502400000.0, 740.73, 1796.4],
      [1312588800000.0, -493.48, 552.45],
      [1312675200000.0, 498.03, 1542.48],
      [1312761600000.0, 943.7, 1985.78],
      [1312848000000.0, 1106.22, 2110.54],
      [1312934400000.0, 1038.65, 2053.38],
      [1313020800000.0, 1151.21, 2176.13],
      [1313107200000.0, 723.45, 1825.86],
      [1313193600000.0, -525.74, 538.55],
      [1313280000000.0, 556.97, 1586.87],
      [1313366400000.0, 987.82, 1992.58],
      [1313452800000.0, 1113.36, 2099.91],
      [1313539200000.0, 1097.87, 2095.3],
      [1313625600000.0, 1149.29, 2188.41],
      [1313712000000.0, 752.83, 1758.25],
      [1313798400000.0, -450.27, 542.26],
      [1313884800000.0, 569.22, 1620.49],
      [1313971200000.0, 987.92, 2017.31],
      [1314057600000.0, 1102.56, 2140.6],
      [1314144000000.0, 1062.06, 2114.17],
      [1314230400000.0, 1126.73, 2209.12],
      [1314316800000.0, 785.73, 1842.54],
      [1314403200000.0, -504.67, 567.94],
      [1314489600000.0, 567.97, 1617.48],
      [1314576000000.0, 957.06, 2012.2],
      [1314662400000.0, 1131.11, 2177.34],
      [1314748800000.0, 1055.51, 2144.69],
      [1314835200000.0, 1140.78, 2209.78],
      [1314921600000.0, 764.66, 1795.82],
      [1315008000000.0, -498.2, 560.68],
      [1315094400000.0, 565.58, 1620.28],
      [1315180800000.0, 985.38, 2011.28],
      [1315267200000.0, 1151.11, 2165.58],
      [1315353600000.0, 1091.6, 2131.18],
      [1315440000000.0, 1140.26, 2223.05],
      [1315526400000.0, 785.74, 1803.8],
      [1315612800000.0, -420.24, 558.77],
      [1315699200000.0, 549.78, 1608.94],
      [1315785600000.0, 989.38, 1995.58],
      [1315872000000.0, 1108.91, 2186.45],
      [1315958400000.0, 1091.76, 2110.39],
    ],
    values: [
      [1308096000000.0, 1683],
      [1308182400000.0, 1503],
      [1308268800000.0, 942],
      [1308355200000.0, 0],
      [1308441600000.0, 1157],
      [1308528000000.0, 1978],
      [1308614400000.0, 1453],
      [1308700800000.0, 1008],
      [1308787200000.0, 1948],
      [1308873600000.0, 1024],
      [1308960000000.0, 0],
      [1309046400000.0, 667],
      [1309132800000.0, 1156],
      [1309219200000.0, 999],
      [1309305600000.0, 1315],
      [1309392000000.0, 1609],
      [1309478400000.0, 978],
      [1309564800000.0, 0],
      [1309651200000.0, 598],
      [1309737600000.0, 2185],
      [1309824000000.0, 2175],
      [1309910400000.0, 1795],
      [1309996800000.0, 1896],
      [1310083200000.0, 1579],
      [1310169600000.0, 0],
      [1310256000000.0, 815],
      [1310342400000.0, 1490],
      [1310428800000.0, 1646],
      [1310515200000.0, 1610],
      [1310601600000.0, 1663],
      [1310688000000.0, 1118],
      [1310774400000.0, 0],
      [1310860800000.0, 1246],
      [1310947200000.0, 2167],
      [1311033600000.0, 1576],
      [1311120000000.0, 1993],
      [1311206400000.0, 1494],
      [1311292800000.0, 1281],
      [1311379200000.0, 0],
      [1311465600000.0, 1116],
      [1311552000000.0, 1935],
      [1311638400000.0, 1233],
      [1311724800000.0, 1228],
      [1311811200000.0, 1510],
      [1311897600000.0, 1119],
      [1311984000000.0, 0],
      [1312070400000.0, 1270],
      [1312156800000.0, 1189],
      [1312243200000.0, 1332],
      [1312329600000.0, 1521],
      [1312416000000.0, 1782],
      [1312502400000.0, 1442],
      [1312588800000.0, 0],
      [1312675200000.0, 529],
      [1312761600000.0, 1455],
      [1312848000000.0, 1087],
      [1312934400000.0, 1360],
      [1313020800000.0, 1935],
      [1313107200000.0, 1113],
      [1313193600000.0, 0],
      [1313280000000.0, 538],
      [1313366400000.0, 918],
      [1313452800000.0, 1022],
      [1313539200000.0, 1651],
      [1313625600000.0, 1487],
      [1313712000000.0, 811],
      [1313798400000.0, 0],
      [1313884800000.0, 1065],
      [1313971200000.0, 1267],
      [1314057600000.0, 1434],
      [1314144000000.0, 1820],
      [1314230400000.0, 1291],
      [1314316800000.0, 925],
      [1314403200000.0, 0],
      [1314489600000.0, 1196],
      [1314576000000.0, 0],
      [1314662400000.0, 3218],
      [1314748800000.0, 1176],
      [1314835200000.0, 1399],
      [1314921600000.0, 2333],
      [1315008000000.0, 0],
      [1315094400000.0, 1333],
      [1315180800000.0, 1569],
      [1315267200000.0, 1122],
      [1315353600000.0, 2080],
      [1315440000000.0, 1750],
      [1315526400000.0, 1558],
      [1315612800000.0, 0],
      [1315699200000.0, 2027],
      [1315785600000.0, 1638],
      [1315872000000.0, 2428],
      [1315958400000.0, 2533],
      // [1315958400000.0, 1333],
    ],
    predicted_values: [
      [1308096000000.0, 1474.19],
      [1308182400000.0, 1574.33],
      [1308268800000.0, 1186.34],
      [1308355200000.0, -61.53],
      [1308441600000.0, 981.28],
      [1308528000000.0, 1395.88],
      [1308614400000.0, 1532.64],
      [1308700800000.0, 1484.46],
      [1308787200000.0, 1584.6],
      [1308873600000.0, 1196.62],
      [1308960000000.0, -51.26],
      [1309046400000.0, 991.55],
      [1309132800000.0, 1406.15],
      [1309219200000.0, 1542.91],
      [1309305600000.0, 1494.74],
      [1309392000000.0, 1594.87],
      [1309478400000.0, 1206.89],
      [1309564800000.0, -40.99],
      [1309651200000.0, 1001.82],
      [1309737600000.0, 1416.42],
      [1309824000000.0, 1553.19],
      [1309910400000.0, 1505.01],
      [1309996800000.0, 1605.14],
      [1310083200000.0, 1217.16],
      [1310169600000.0, -30.72],
      [1310256000000.0, 1012.09],
      [1310342400000.0, 1426.69],
      [1310428800000.0, 1563.46],
      [1310515200000.0, 1515.28],
      [1310601600000.0, 1615.41],
      [1310688000000.0, 1227.43],
      [1310774400000.0, -20.45],
      [1310860800000.0, 1022.36],
      [1310947200000.0, 1436.96],
      [1311033600000.0, 1573.73],
      [1311120000000.0, 1525.55],
      [1311206400000.0, 1625.69],
      [1311292800000.0, 1237.7],
      [1311379200000.0, -10.18],
      [1311465600000.0, 1032.63],
      [1311552000000.0, 1447.23],
      [1311638400000.0, 1584.0],
      [1311724800000.0, 1535.82],
      [1311811200000.0, 1635.96],
      [1311897600000.0, 1247.97],
      [1311984000000.0, 0.09],
      [1312070400000.0, 1042.9],
      [1312156800000.0, 1457.5],
      [1312243200000.0, 1594.27],
      [1312329600000.0, 1546.09],
      [1312416000000.0, 1646.23],
      [1312502400000.0, 1258.24],
      [1312588800000.0, 10.36],
      [1312675200000.0, 1053.17],
      [1312761600000.0, 1467.78],
      [1312848000000.0, 1604.54],
      [1312934400000.0, 1556.37],
      [1313020800000.0, 1656.51],
      [1313107200000.0, 1268.52],
      [1313193600000.0, 20.65],
      [1313280000000.0, 1063.47],
      [1313366400000.0, 1478.09],
      [1313452800000.0, 1614.87],
      [1313539200000.0, 1566.7],
      [1313625600000.0, 1666.86],
      [1313712000000.0, 1278.9],
      [1313798400000.0, 31.04],
      [1313884800000.0, 1073.87],
      [1313971200000.0, 1488.5],
      [1314057600000.0, 1625.28],
      [1314144000000.0, 1577.13],
      [1314230400000.0, 1677.29],
      [1314316800000.0, 1289.33],
      [1314403200000.0, 41.47],
      [1314489600000.0, 1084.3],
      [1314576000000.0, 1498.93],
      [1314662400000.0, 1635.72],
      [1314748800000.0, 1587.56],
      [1314835200000.0, 1687.72],
      [1314921600000.0, 1299.76],
      [1315008000000.0, 51.9],
      [1315094400000.0, 1094.74],
      [1315180800000.0, 1509.36],
      [1315267200000.0, 1646.15],
      [1315353600000.0, 1598.0],
      [1315440000000.0, 1698.16],
      [1315526400000.0, 1310.19],
      [1315612800000.0, 62.34],
      [1315699200000.0, 1105.17],
      [1315785600000.0, 1519.8],
      [1315872000000.0, 1656.59],
      [1315958400000.0, 1608.43],
    ],
    severity: [
      [1308096000000.0, null],
      [1308182400000.0, null],
      [1308268800000.0, null],
      [1308355200000.0, null],
      [1308441600000.0, null],
      [1308528000000.0, "Low"],
      [1308614400000.0, null],
      [1308700800000.0, null],
      [1308787200000.0, null],
      [1308873600000.0, null],
      [1308960000000.0, null],
      [1309046400000.0, null],
      [1309132800000.0, null],
      [1309219200000.0, "Low"],
      [1309305600000.0, null],
      [1309392000000.0, null],
      [1309478400000.0, null],
      [1309564800000.0, null],
      [1309651200000.0, null],
      [1309737600000.0, "Low"],
      [1309824000000.0, "Low"],
      [1309910400000.0, null],
      [1309996800000.0, null],
      [1310083200000.0, null],
      [1310169600000.0, null],
      [1310256000000.0, null],
      [1310342400000.0, null],
      [1310428800000.0, null],
      [1310515200000.0, null],
      [1310601600000.0, null],
      [1310688000000.0, null],
      [1310774400000.0, null],
      [1310860800000.0, null],
      [1310947200000.0, "Low"],
      [1311033600000.0, null],
      [1311120000000.0, null],
      [1311206400000.0, null],
      [1311292800000.0, null],
      [1311379200000.0, null],
      [1311465600000.0, null],
      [1311552000000.0, null],
      [1311638400000.0, null],
      [1311724800000.0, null],
      [1311811200000.0, null],
      [1311897600000.0, null],
      [1311984000000.0, null],
      [1312070400000.0, null],
      [1312156800000.0, null],
      [1312243200000.0, null],
      [1312329600000.0, null],
      [1312416000000.0, null],
      [1312502400000.0, null],
      [1312588800000.0, null],
      [1312675200000.0, null],
      [1312761600000.0, null],
      [1312848000000.0, "Low"],
      [1312934400000.0, null],
      [1313020800000.0, null],
      [1313107200000.0, null],
      [1313193600000.0, null],
      [1313280000000.0, "Low"],
      [1313366400000.0, "Low"],
      [1313452800000.0, "Low"],
      [1313539200000.0, null],
      [1313625600000.0, null],
      [1313712000000.0, null],
      [1313798400000.0, null],
      [1313884800000.0, null],
      [1313971200000.0, null],
      [1314057600000.0, null],
      [1314144000000.0, null],
      [1314230400000.0, null],
      [1314316800000.0, null],
      [1314403200000.0, null],
      [1314489600000.0, null],
      [1314576000000.0, "Chaos"],
      [1314662400000.0, "Low"],
      [1314748800000.0, null],
      [1314835200000.0, null],
      [1314921600000.0, "Low"],
      [1315008000000.0, null],
      [1315094400000.0, null],
      [1315180800000.0, null],
      [1315267200000.0, "Low"],
      [1315353600000.0, null],
      [1315440000000.0, null],
      [1315526400000.0, null],
      [1315612800000.0, null],
      [1315699200000.0, "Low"],
      [1315785600000.0, null],
      [1315872000000.0, "Low"],
      [1315958400000.0, "Low"],
      // [1315958400000.0, null],
    ],
  },
];

// Need to do some preprocessing to get severity data in the right form!
function parseSeverity(graph) {
  graphs.forEach((graph) => {
    sens = {};
    graph.severity.forEach((severity) => {
      sens[severity[0]] = severity[1];
    });
    graph.severity = sens;
  });
  return graphs;
}
graphs = parseSeverity(graphs);

// Code to create zones where graph is marked anomaly
function findAnomalyZones(intervals, values) {
  let validColor = "#25cc7b",
    anomalyColor = "#ff5f5f";
  let zones = Array();
  let prev = null;
  let anomalyType = null; // 1 for above Confidence interval. -1 for below
  for (let i = 0; i < values.length; i++) {
    let interval = intervals[i],
      value = values[i];
    let zone = {
      value: value[0],
    };

    // point is an anomaly
    if (value[1] < interval[1]) {
      anomalyType = -1;
      zone.color = anomalyColor;
    } else if (value[1] > interval[2]) {
      anomalyType = 1;
      zone.color = anomalyColor;
    } else {
      zone.color = validColor;
    }

    // Push prev zone if colors should be different
    // Update prev zone
    if (prev != null && prev.color != zone.color) {
      const interIdx = anomalyType == 1 ? 2 : 1;
      let { m: m1, b: b1 } = findSlopeAndYIntercept(
        [intervals[i - 1][0], intervals[i - 1][interIdx]],
        [interval[0], [interval[interIdx]]]
      );
      let { m: m2, b: b2 } = findSlopeAndYIntercept(values[i - 1], value);
      let { x, y } = findIntersection(m1, b1, m2, b2);

      prev.value = x;
      zones.push(prev);
    }
    prev = zone;
  }

  // Add last zone
  if (zones.length > 0) {
    let lastTimestamp = values[values.length - 1][0];
    zones.push({
      // Some timestamp far beyond the largest timestamp, so that the end of the graph is the right color
      value: lastTimestamp * 2,
      color: prev.color,
    });
  }
  return zones;
}

// Find slope and y-intercept of line between two points
function findSlopeAndYIntercept(p1, p2) {
  const m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  const b = p1[1] - m * p1[0];
  return {
    m,
    b,
  };
}

// Find the intersection of 2 lines using the slope and y-intercept of each line.
function findIntersection(m1, b1, m2, b2) {
  let x = (b2 - b1) / (m1 - m2);
  let y = m1 * x + b1;
  return {
    x,
    y,
  };
}

//
// Plotting
//

// Globally use commas to separate thousands when displaying numbers
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

// For each graph, plot using Highcharts
graphs.forEach((graphData, i) => {
  let zones = findAnomalyZones(graphData.intervals, graphData.values);

  // Use the container's id instead of i.toString() to map the graph to correct container
  Highcharts.chart(i.toString(), {
    chart: {
      zoomType: "x,y",
      selectionMarkerFill: "rgba(37, 204, 123, 0.25)",
    },
    title: {
      text: graphData.title,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: graphData.x_axis_label,
      },
    },
    yAxis: {
      title: {
        text: graphData.y_axis_label,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: null,
      // Formats the tooltip to add severity whenever applicable.
      formatter(tooltip) {
        severity = graphData.severity[this.points[0].key];
        tip = tooltip.defaultFormatter.call(this, tooltip);
        if (severity != null) {
          tip.push(
            `<span style="color:#000">●</span> Severity: <b>${severity}</b><br/>`
          );
        }
        return tip;
      },
    },
    legend: {
      enabled: true,
      borderWidth: 1,
      padding: 20,
      title: {
        text: 'Legend<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)',
        style: {
          fontStyle: "italic",
        },
      },
    },
    series: [
      {
        name: "Confidence Interval",
        id: "Confidence Interval",
        data: graphData.intervals,
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        color: "#29A374",
        fillOpacity: 0.2,
        zIndex: 0,
        marker: {
          fillColor: "grey",
          enabled: false,
          symbol: "diamond",
        },
      },
      {
        name: "Value",
        id: "value",
        zoneAxis: "x",
        zones: zones,
        data: graphData.values,
        zIndex: 2,
        color: "#25cc7b",
        marker: {
          fillColor: "white",
          lineWidth: 1,
          lineColor: "grey",
          symbol: "circle",
        },
      },
      {
        name: "Predicted Value",
        id: "predicted_value",
        visible: false,
        type: "line",
        data: graphData.predicted_values,
        zIndex: 1,
        color: "#02964e",
        dashStyle: "Dash",
        opacity: 0.5,
        marker: {
          fillColor: "gray",
          lineWidth: 1,
          radius: 2,
          lineColor: "white",
          enabled: false,
          symbol: "circle",
        },
      },
    ],
  });
});
