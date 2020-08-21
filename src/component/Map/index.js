import React from "react";
import Canada from "@svg-maps/canada";
import { RadioSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./index.scss";

const Map = (props) => {
  const { updateProvince } = props;

  const setProvince = (e) => {
    console.log("setProvince -> e", e.attributes.name.value);
    const province = e.attributes.name.value;
    updateProvince(province);
  };

  return (
    <div className="map-container">
      <RadioSVGMap map={Canada} onChange={setProvince} />
    </div>
  );
};

export default Map;
