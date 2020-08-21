import React, { useState } from "react";
import AppBar from "./component/MenuAppBar";
import LeftPanel from "./component/LeftPanel";
import Card from "@material-ui/core/Card";
import Map from "./component/Map";
import CanadaChart from "./component/CanadaChart";
import ProvinceChart from "./component/ProvinceChart";
import Typography from "@material-ui/core/Typography";

import "./App.css";

function App() {
  const [province, setData] = useState("canada"); // default starts at canada
  console.log("App -> province", province);

  const isCanadaView = province === "canada";
  return (
    <div className="App">
      <AppBar />
      <Typography variant="h3" color="primary" style={{ marginTop: "10px" }}>
        {province}
      </Typography>
      <div className="home-side-panel">
        <LeftPanel province={province} />
      </div>
      <Card className="map-chart-container">
        <Card className="chart">
          {isCanadaView ? (
            <CanadaChart country="canada" />
          ) : (
            <ProvinceChart province={province} />
          )}
        </Card>
        <Card className="map">
          <Map updateProvince={setData} />
        </Card>
      </Card>
    </div>
  );
}

export default App;
