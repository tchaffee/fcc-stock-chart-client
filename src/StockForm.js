import React, { Component } from 'react';
import Stock from './Stock';
import StockInput from './StockInput';
import { Row, Col } from 'react-bootstrap';

class StockForm extends Component {


  handleClose () {
    console.log('Close handled.');
  };

  render() {
    return (
      <Row className="StockForm">
        <Col md={12}>
            <Stock name="GOOGL" handleClose={this.handleClose} />
            <Stock name="SHLD" handleClose={this.handleClose} />
            <Stock name="IBM" handleClose={this.handleClose} />
            <Stock name="FBOOK" handleClose={this.handleClose} />
            <StockInput />
        </Col>
      </Row>
    );
  };
}

export default StockForm;
