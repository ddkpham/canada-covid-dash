import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { options, styles, startingData } from "./data";
import NoDataCard from "./NoDataCard";
import { baseURL } from "../../config/url";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./index.scss";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class ProvinceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: startingData,
      province: this.props.province,
      start: new Date("2020-04-15T21:11:54"), // start of dataset
      end: new Date(), // current date
      snackbarOpen: false,
    };
  }

  async componentDidMount() {
    this.updateProvinceDataSet();
  }

  areDatesEqual = (date1, date2) => {
    return date1.toISOString() == date2.toISOString();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState.start && prevState.end) {
      const startUnchanged = this.areDatesEqual(
        prevState.start,
        this.state.start
      );
      const endUnchanged = this.areDatesEqual(prevState.end, this.state.end);

      if (startUnchanged && endUnchanged) {
        if (this.props.province === this.state.province) {
          return;
        }
      }
    }
    await this.updateProvinceDataSet(); // updates data
  }

  handleStartChange = (date) => {
    if (date > this.state.end) {
      this.setState({ snackbarOpen: true });
    } else {
      this.setState({ start: date });
    }
  };

  handleClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleEndChange = (date) => {
    if (date < this.state.start) {
      this.setState({ snackbarOpen: true });
    } else {
      this.setState({ end: date });
    }
  };

  formatDate = (date) => {
    return date.toISOString().split("T")[0] + "T00:00:00Z";
  };

  updateProvinceDataSet = async () => {
    const { start: startDate, end: endDate } = this.state;
    const start = this.formatDate(startDate);
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
    const { data, start, end, snackbarOpen } = this.state;
    const { province } = this.props;
    const containsChartData = data.labels.length >= 1;
    return (
      <div style={styles.graphContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="date-picker-container">
            <KeyboardDatePicker
              margin="normal"
              id="start-picker-dialog"
              label="Start"
              format="MM/dd/yyyy"
              minDate={new Date("2020-04-15T21:11:54")}
              maxDate={new Date()}
              value={start}
              onChange={this.handleStartChange}
              KeyboardButtonProps={{
                "aria-label": "change start date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="end-picker-dialog"
              label="End"
              format="MM/dd/yyyy"
              minDate={new Date("2020-04-15T21:11:54")}
              maxDate={new Date()}
              value={end}
              onChange={this.handleEndChange}
              KeyboardButtonProps={{
                "aria-label": "change end date",
              }}
            />
          </div>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            start and end dates are invalid! Please select a valid range.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ProvinceChart;
