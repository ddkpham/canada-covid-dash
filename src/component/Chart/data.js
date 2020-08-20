const startingData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Active",
      fillColor: "rgba(60,179,113,0.2)",
      borderColor: "rgba(60,179,113,0.2)",
      strokeColor: "rgba(60,179,113,0.2)",
      pointColor: "rgba(60,179,113,1)",
      pointBackgroundColor: "rgba(60,179,113,1)",
      pointHoverBackgroundColor: "rgba(60,179,113,1)",
      pointHoverBorderWidth: "30",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40, 20, 20],
    },
    {
      label: "Confirmed",
      fillColor: "rgba(204,204,0,0.2)",
      borderColor: "rgba(204,204,0,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(204,204,0,1)",
      pointBackgroundColor: "rgba(204,204,0,1)",
      pointHoverBorderWidth: "30",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
    {
      label: "Deaths",
      fillColor: "rgba(220,20,60,0.2)",
      borderColor: "rgba(220,20,60,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(220,20,60,0.5)",
      pointBackgroundColor: "rgba(220,20,60,0.5)",
      pointHoverBorderWidth: "30",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
    {
      label: "Recovered",
      fillColor: "rgba(0,191,255,0.2)",
      borderColor: "rgba(0,191,255,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(0,191,255,1)",
      pointBackgroundColor: "rgba(0,191,255,1)",
      pointHoverBorderWidth: "30",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

const styles = {
  graphContainer: {
    border: "1px solid black",
    padding: "15px",
  },
};

export { startingData, options, styles };
