import React, { Component } from 'react';
import Stock from './Stock';
import StockInput from './StockInput';
import { Row, Col } from 'react-bootstrap';

class StockForm extends Component {


  handleClose () {
    console.log('Close handled.');
  };

  render() {
    const stocks = this.props.data.map((item, index) => {
      return <Stock key={index} name={item} handleClose={this.handleClose} />
    });

    return (
      <Row className="StockForm">
        <Col md={12}>
            { stocks }
            <StockInput />
        </Col>
      </Row>
    );
  };
}

export default StockForm;
