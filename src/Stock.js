import React, { Component } from 'react';
import './Stock.css';
import { Col, Button } from 'react-bootstrap';
import fetchJsonp from 'fetch-jsonp';

class Stock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      stockInfo: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    this.props.handleClose(this.props.name);
  }

  componentDidMount () {
    fetchJsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${this.state.name}`)
    .then(result => result.json())
    .then(data => this.setState({ stockInfo: data[0].Name }));
  }

  render() {
    return (
      <Col md={4} sm={6} className="Stock">
        <h3>{this.props.name}
          <Button type="button" className="close" onClick={this.handleClick}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </h3>
        <div id="StockInfo" className="StockInfo">{this.state.stockInfo}</div>
      </Col>
    );
  }
}

export default Stock;
