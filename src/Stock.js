import React, { Component } from 'react';
import './Stock.css';
import { Col, Button } from 'react-bootstrap';

class Stock extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    this.props.handleClose(this.props.name);
  }

  render() {
    return (
      <Col md={4} sm={6} className="Stock">
        <h3>{this.props.name}
          <Button type="button" className="close" onClick={this.handleClick}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </h3>
      </Col>
    );
  }
}

export default Stock;
