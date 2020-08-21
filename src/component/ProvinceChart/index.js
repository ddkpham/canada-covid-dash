import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { options, styles, startingData } from "./data";
import NoDataCard from "./NoDataCard";
import { baseURL } from "../../config/url";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class ProvinceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: startingData,
      province: this.props.province,
      start: new Date("2020-04-15T21:11:54"), // start of dataset
      end: new Date(), // current date
    };
  }

  async componentDidMount() {
    this.updateProvinceDataSet();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState.start && prevState.end) {
      const pStart = prevState.start.toISOString();
      const cStart = this.state.start.toISOString();
      const pEnd = prevState.end.toISOString();
      const cEnd = this.state.end.toISOString();
      console.log("ProvinceChart -> componentDidUpdate -> pStart", pStart);
      const startUnchanged = pStart === cStart;
      const endUnchanged = pEnd === cEnd;
      console.log(
        "ProvinceChart -> componentDidUpdate -> startChanged",
        startUnchanged
      );

      console.log(
        "ProvinceChart -> componentDidUpdate -> endChange",
        endUnchanged
      );
      if (startUnchanged && endUnchanged) {
        return;
      }
    }
    await this.updateProvinceDataSet(); // updates data
  }

  handleStartChange = (date) => {
    this.setState({ start: date });
  };

  handleEndChange = (date) => {
    this.setState({ end: date });
  };

  formatDate = (date) => {
    return date.toISOString().split("T")[0] + "T00:00:00Z";
  };

  updateProvinceDataSet = async () => {
    const { start: startDate, end: endDate } = this.state;
    const start = this.formatDate(startDate);
    console.log("ProvinceChart -> updateProvinceDataSet -> start", start);
    const end = this.formatDate(endDate);
    const { province } = this.props;
    const url = `${baseURL}/country/canada?from=${start}&to=${end}`;
    const response = await fetch(url);
    console.log("LineChartExample -> updateProvinceDataSet -> url", url);
    const data = await response.json();
    console.log("LineChartExample -> updateProvinceDataSet -> data", data);
    const provinceData = data.filter((rec) => rec.Province === province);
    console.log(
      "ProvinceChart -> updateProvinceDataSet -> provinceData",
      provinceData
    );
    const newData = this.generateDataSets(provinceData);
    this.setState({ data: newData });
  };

  generateDataSets(data) {
    const {
      data: { datasets },
    } = this.state;

    var activeCasesData = data.map((record) => {
      return record.Active;
    });

    var lastNonZeroIndex = 0;
    activeCasesData = activeCasesData.map((rec, index) => {
      if (!rec) {
        return activeCasesData[lastNonZeroIndex];
      } else {
        lastNonZeroIndex = index;
        return rec;
      }
    });
    const confirmedCasesData = data.map((record) => {
      return record.Confirmed;
    });

    const deathsData = data.map((record) => {
      return record.Deaths;
    });

    const newLabels = data.map((record) => {
      const strippedDate = record.Date.split("T")[0];
      return strippedDate;
    });

    const newDataSets = datasets.map((dataset, index) => {
      const newDataSet = { ...dataset };
      switch (index) {
        case 0:
          newDataSet.data = activeCasesData;
          break;
        case 1:
          newDataSet.data = confirmedCasesData;
          break;
        case 2:
          newDataSet.data = deathsData;
          break;
        default:
          break;
      }
      return newDataSet;
    });

    const newData = {};
    newData.labels = newLabels;
    newData.datasets = newDataSets;
    return newData;
  }

  render() {
    const { data, start, end } = this.state;
    const { province } = this.props;
    const containsChartData = data.labels.length >= 1;
    return (
      <div style={styles.graphContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start"
            format="MM/dd/yyyy"
            value={start}
            onChange={this.handleStartChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="End"
            format="MM/dd/yyyy"
            value={end}
            onChange={this.handleEndChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        {containsChartData ? (
          <LineChart
            type="line"
            data={data}
            options={options}
            width="600"
            height="250"
            country={province}
          />
        ) : (
          <NoDataCard />
        )}
      </div>
    );
  }
}

export default ProvinceChart;
