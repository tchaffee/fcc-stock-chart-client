import React, { Component } from 'react';
import './App.css';
import StockChart from './StockChart';
import StockForm from './StockForm';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid className="App">
        <h1>Stock Charts</h1>
        <StockChart />
        <StockForm />
      </Grid>
    );
  }
}

export default App;
