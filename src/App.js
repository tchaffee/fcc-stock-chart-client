import React, { Component } from 'react';
import './App.css';
import StockChart from './StockChart';
import StockForm from './StockForm';
import { Grid } from 'react-bootstrap';
import Markit from './Markit';
import env from './env';

class App extends Component {

  constructor () {
    super();
    this.state = {
      stocks: [],
      chartOptions: {}
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  };

  componentDidMount () {

    this.connection = new WebSocket(env.websocketServer);

    // listen to onmessage event
    this.connection.onmessage = function(evt) {
      const json = JSON.parse(evt.data);

        if (json.stocks.length) {
          new Markit.InteractiveChartApi(json.stocks, 365)
           .then(function(data) {
             this.setState({
               chartOptions: data[0],
               stocks: json.stocks
             });
           }.bind(this))
        } else {
         this.setState({
           chartOptions: {},
           stocks: []
         });
        }
    }.bind(this);

    this.connection.onopen = evt => {
      this.connection.send('{ "action": "GET_STOCKS" }');
    };

  }

  handleClose (symbol) {
    console.log('Close handled.' + symbol);
    const message = {
      action: "REMOVE_STOCK",
      symbol: symbol
    };

    this.connection.send(JSON.stringify(message));
  };

  handleAdd (symbol) {
    console.log('Add handled. ' + symbol);
    const message = {
      action: "ADD_STOCK",
      symbol: symbol
    };

    this.connection.send(JSON.stringify(message));
  };

  render() {
    console.log('rendering App component...');

    return (
      <Grid className="App">
        <h1>Stock Charts</h1>
        <StockChart stocks={this.state.stocks} chartOptions={this.state.chartOptions}/>
        <StockForm data={this.state.stocks} handleClose={this.handleClose} handleAdd={this.handleAdd} />
      </Grid>
    );
  }
}

export default App;
