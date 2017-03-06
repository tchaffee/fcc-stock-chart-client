import React, { Component } from 'react';
import './StockInput.css';
import { Col, FormGroup, InputGroup, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import fetchJsonp from 'fetch-jsonp';

class StockInput extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', options: [], selected: [] };

    this.handleSelected = this.handleSelected.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelected(selectedValue) {
    console.log('selectedValue:');
    console.log(selectedValue);
    this.setState({ selected: [selectedValue[0]] });
    console.log(this.state.selected);
  }

  handleInputChange(event) {
    this.setState({ value: event.toUpperCase() });
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.selected.length > 0) {
      this.props.handleAdd(this.state.selected[0]);
    }
    this.refs.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Col md={4} sm={6} className="Stock StockInput">
        <h4>Syncs in realtime in each person's browser</h4>
        <form id="StockInputForm">
          <FormGroup>
            <InputGroup>
              <AsyncTypeahead
                selected={this.state.selected}
                id="AsyncTypeAhead"
                ref="typeahead"
                placeholder="Choose a Stock Symbol..."
                value={this.state.value}
                onSearch={query => (
                  fetchJsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${query}`)
                  .then(resp => resp.json())
                  .then(json => {
                    const options = json.map(el => el.Symbol);
                    this.setState({options: options});
                  })
                  )}
                options={this.state.options}
                onInputChange={this.handleInputChange}
                onChange={this.handleSelected}
              />
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
