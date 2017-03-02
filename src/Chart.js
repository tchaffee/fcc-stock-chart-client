import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';

class Chart extends Component {

  // When the DOM is ready, create the chart.
  componentDidMount() {
      // Extend Highcharts with modules
      if (this.props.modules) {
          this.props.modules.forEach(function (module) {
              module(Highcharts);
          });
      }

  }
  //Destroy chart before unmount.
  componentWillUnmount() {
      this.chart.destroy();
  }
  //Create the div which the chart will be rendered to.
  render() {
    if (this.props.chartData.series) {
      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          this.props.chartData
      );
    }
    return null;
  }
}
export default Chart;
