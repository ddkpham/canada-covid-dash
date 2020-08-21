import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { options, styles, startingData } from "./data";
import NoDataCard from "./NoDataCard";
import { baseURL } from "../../config/url";

class ProvinceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: startingData,
      province: this.props.province,
    };
  }

  async componentDidMount() {
    this.updateProvinceDataSet();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.province === this.state.province &&
      prevProps.province === this.props.province
    ) {
      return;
    }
    this.updateProvinceDataSet();
  }

  updateProvinceDataSet = async () => {
    const { province } = this.props;
    const url = `${baseURL}/country/canada?from=2020-04-17T00:00:00Z&to=2020-08-20T00:00:00Z`;
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
    const { data } = this.state;
    const { province } = this.props;
    const containsChartData = data.labels.length >= 1;
    return (
      <div style={styles.graphContainer}>
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
