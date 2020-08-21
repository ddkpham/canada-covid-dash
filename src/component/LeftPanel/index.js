import React, { useState, useEffect } from "react";
import { CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { baseURL } from "../../config/url";
import { getCall } from "../../apiCalls";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ActiveCard from "./ActiveCard";
import DeathCard from "./DeathCard";
import RecoveredCard from "./RecoveredCard";

import "./index.scss";

const provinces = [
  "British Columbia",
  "Prince Edward Island",
  "Alberta",
  "Yukon",
  "Ontario",
  "Manitoba",
  "Saskatchewan",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Quebec",
  "Northwest Territories",
  "Nova Scotia",
];

const provinceOptions = provinces.map((p, i) => ({ name: p, index: i }));

const RightPanel = (props) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("RightPanel -> isLoaded", isLoaded);
  // const [province, setProvince] = useState({
  //   name: "British Columbia",
  //   index: 0,
  // });
  const { province } = props;
  console.log("RightPanel -> province", province);
  console.log("RightPanel -> data", data);

  useEffect(() => {
    var today = new Date().toISOString();
    var yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 2);
    yesterday = yesterday.toISOString();

    today = today.split("T")[0] + "T00:00:00Z";
    yesterday = yesterday.split("T")[0] + "T00:00:00Z";

    console.log("RightPanel -> yesterday", yesterday);
    console.log("RightPanel -> today", today);
    async function getData() {
      var url = `${baseURL}/country/canada?from=${yesterday}&to=${today}`;
      console.log("getData -> url", url);
      try {
        var response = await getCall(url);
        var payload = await response.json();
        if (payload.length > 15) {
          setData(payload);
          setIsLoaded(true);
        } else {
          // not enough data. Go back a day.
          yesterday = new Date();

          yesterday.setDate(yesterday.getDate() - 3);
          yesterday = yesterday.toISOString();
          yesterday = yesterday.split("T")[0] + "T00:00:00Z";
          url = `${baseURL}/country/canada?from=${yesterday}&to=${today}`;
          response = await getCall(url);
          payload = await response.json();
          setData(payload);
          setIsLoaded(true);
        }
      } catch (err) {
        console.log("getData -> err", err);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var provinceData = data.filter((record) => record.Province == province);
  if (!provinceData.length) {
    // temp fix for no canada info
    provinceData = data.filter(
      (record) => record.Province == "British Columbia"
    );
  }

  const infoCards = isLoaded ? (
    <div>
      <ActiveCard provinceData={provinceData} />
      <RecoveredCard provinceData={provinceData} />
      <DeathCard provinceData={provinceData} />
    </div>
  ) : null;

  console.log("RightPanel -> provinceData", provinceData);

  return (
    <div className="right-panel-container">
      <Card>
        <Autocomplete
          id="province-selector"
          options={provinceOptions}
          getOptionLabel={(option) => option.name}
          style={{ width: 250, margin: 10 }}
          renderInput={(params) => (
            <TextField {...params} label="Province" variant="outlined" />
          )}
          onChange={(e, value) => console.log(value)}
        />
      </Card>
      {infoCards}
    </div>
  );
};

export default RightPanel;
