import React, { Component } from 'react';
import './App.css';
import StockChart from './StockChart';
import StockForm from './StockForm';
import { Grid } from 'react-bootstrap';

class App extends Component {

  constructor () {
    super();
    this.state = {
      stocks: []
    };
  };

  componentDidMount () {
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket('ws://localhost:8080');
    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
        const json = JSON.parse(evt.data);
        this.setState({ stocks: json.stocks });
    };
    this.connection.onopen = evt => {
      this.connection.send('{ "action": "GET_STOCKS" }');
    };
  }

  render() {
    return (
      <Grid className="App">
        <h1>Stock Charts</h1>
        <StockChart />
        <StockForm data={this.state.stocks}/>
      </Grid>
    );
  }
}

export default App;
