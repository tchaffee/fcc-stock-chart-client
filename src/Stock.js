import React, { Component } from 'react';
import './Stock.css';
import { Col, Button } from 'react-bootstrap';

class Stock extends Component {
  render() {
    return (
      <Col md={4} sm={6} className="Stock">
        <h3>{this.props.name}
          <Button type="button" className="close" onClick={this.props.handleClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </h3>
      </Col>
    );
  }
}

export default Stock;
