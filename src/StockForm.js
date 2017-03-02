import React, { Component } from 'react';
import './StockForm.css';
import Stock from './Stock';
import StockInput from './StockInput';
import { Row, Col } from 'react-bootstrap';

class StockForm extends Component {

  render() {
    const stocks = this.props.data.map((item, index) => {
      return <Stock key={index} name={item} handleClose={this.props.handleClose} />
    });

    return (
      <Row className="StockForm">
        <Col md={12}>
            { stocks }
            <StockInput handleAdd={this.props.handleAdd} />
        </Col>
      </Row>
    );
  };
}

export default StockForm;
