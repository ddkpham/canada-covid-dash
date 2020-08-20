import React from "react";
import logo from "./logo.svg";
import Canada from "@svg-maps/canada";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="map">
        <SVGMap
          map={Canada}
          onLocationMouseOver={(e, v) =>
            console.log(e.target.attributes.name, v)
          }
        />
      </div>
    </div>
  );
}

export default App;
