import React, { Component } from 'react';
import './Stock.css';
import { Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class StockInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.handleAdd(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <Col md={4} sm={6} className="Stock">
        Syncs in realtime in each person's browser
        <form>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={this.state.value} onChange={this.handleChange}/>
              <InputGroup.Button>
                <Button onClick={this.handleSubmit}>Add</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </Col>
    );
  }
}

export default StockInput;
