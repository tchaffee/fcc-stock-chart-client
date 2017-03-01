import React, { Component } from 'react';
import './Stock.css';
import { Col } from 'react-bootstrap';

class StockInput extends Component {
  render() {
    return (
      <Col md={4} sm={6} className="Stock">
        <h3>'ere to input new stocks
        </h3>
      </Col>
    );
  }
}

export default StockInput;
