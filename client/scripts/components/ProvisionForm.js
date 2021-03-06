import React, {Component} from 'react';
import {Input, Row, Col} from 'react-bootstrap';

export default class ProvisionForm extends Component {
  validationState(key) {
    let prop = this.props.provision[key];
    if (typeof(prop) === 'undefined') {
      return;
    }
    else if (key === 'name' || key === 'unit') {
      return prop.length > 0 ? 'success' : 'error';
    }
  }

  handleChange(e) {
    let field = e.target.id;
    let props = {
      name: this.props.provision.name,
      description: this.props.provision.description,
      unit: this.props.provision.unit,
      total: this.props.provision.total
    };
    if (this.props.provision.id) {
      props.id = this.props.provision.id;
    }
    props[field] = e.target.value;

    if (field === 'total') {
      let total = parseInt(props[field]);
      if (total < 0) {
        props[field] = 0;
      }
    }

    this.props.updateProvision(props);
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={12} md={4}>
            <Input type="text" label="物資名稱" hasFeedback id="name"
                   bsStyle={this.validationState('name')}
                   onChange={this.handleChange.bind(this)}
                   value={this.props.provision.name} />
          </Col>
          <Col xs={12} md={4}>
            <Input type="number" label="所需數量" id="total"
                   bsStyle={this.validationState('total')}
                   onChange={this.handleChange.bind(this)}
                   value={this.props.provision.total}/>
          </Col>
          <Col xs={12} md={4}>
            <Input type="text" label="單位" hasFeedback id="unit"
                   bsStyle={this.validationState('unit')}
                   onChange={this.handleChange.bind(this)}
                   value={this.props.provision.unit}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Input type="textarea" rows="4" label="說明（選填）"
                   id="description"
                   onChange={this.handleChange.bind(this)}
                   value={this.props.provision.description} />
          </Col>
        </Row>

      </form>
    );
  }
}
