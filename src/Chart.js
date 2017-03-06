import { Component } from 'react';
import Highcharts from 'highcharts/highstock';

class Chart extends Component {

  // When the DOM is ready, create the chart.
  componentDidMount() {
    // Extend Highcharts with modules
    console.log('chart did mount...');
    if (this.props.modules) {
        this.props.modules.forEach(function (module) {
            module(Highcharts);
        });
    }
  }

  //Destroy chart before unmount.
  componentWillUnmount() {
    console.log('chart UNmounted...');
    this.chart.destroy();
  }
  
  //Create the div which the chart will be rendered to.
  render() {
    console.log('rendering chart...');
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
