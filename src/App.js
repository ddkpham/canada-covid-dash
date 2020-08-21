import React, { useState } from "react";
import AppBar from "./component/MenuAppBar";
import LeftPanel from "./component/LeftPanel";
import Card from "@material-ui/core/Card";
import Map from "./component/Map";
import Chart from "./component/Chart";

import "./App.css";

function App() {
  const [province, setData] = useState("canada"); // default starts at canada
  console.log("App -> province", province);

  return (
    <div className="App">
      <AppBar />
      <div className="home-side-panel">
        <LeftPanel province={province} />
      </div>
      <Card className="map-chart-container">
        <Card className="chart">
          <Chart country={"canada"} />
        </Card>
        <Card className="map">
          <Map updateProvince={setData} />
        </Card>
      </Card>
    </div>
  );
}

export default App;
