import React, { Component } from 'react';
import Chart from './Chart'

class StockChart extends Component {
  render() {
    console.log('rendering stockchart...');
    return (
      <div id="StockChart" className="StockChart row">
        <Chart container="StockChart" type="StockChart" chartData={this.props.chartOptions} />
        <p>Stock chart goes here</p>
      </div>
    );
  }
}

export default StockChart;
