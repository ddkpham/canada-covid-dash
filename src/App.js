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
  const [province, setProvice] = useState("canada"); // default starts at canada

  const isCanadaView = province === "canada";
  return (
    <div className="App">
      <AppBar setProvice={setProvice} />
      <Typography variant="h3" color="primary" style={{ marginTop: "10px" }}>
        {province}
      </Typography>
      <div className="home-side-panel">
        <LeftPanel province={province} />
      </div>
      <div className="map-chart-container">
        <div className="chart">
          {isCanadaView ? (
            <CanadaChart country="canada" />
          ) : (
            <ProvinceChart province={province} />
          )}
        </div>
        <Card className="map">
          <Map updateProvince={setProvice} />
        </Card>
      </div>
    </div>
  );
}

export default App;
