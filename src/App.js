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
    this.openWebSocket = this.openWebSocket.bind(this);
  };

  openWebSocket () {
    const self = this;
    
    console.log('openWebSocket....');
    this.connection = new WebSocket(env.websocketServer);

    this.connection.onclose = () => {
      console.log('trying to repoen websocket....');
      //try to reconnect in 1 second
      setTimeout(function () { self.openWebSocket(); }, 1000);
    };
    
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

    this.connection.onerror = (event) => {
      console.log('websocket onerror....');
      console.log(event);
    };    
  }

  componentDidMount () {
    this.openWebSocket();
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

    try {
      this.connection.send(JSON.stringify(message));
    } catch (e) {
      console.log('Caught error...');
      console.log(e);
      this.openWebSocket();
    } 
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
