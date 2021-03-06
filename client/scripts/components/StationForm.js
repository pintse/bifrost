import React, {Component} from 'react';
import {Label, Input, Row, Grid, Col} from 'react-bootstrap';
import validator from 'validator';

export default class StationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationName: this.props.stationName,
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
      zipCode: this.props.zipCode,
      city: this.props.city,
      district: this.props.district,
      detail: this.props.detail
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getFormValue() {
    return Object.assign({}, this.state);
  }

  validationState(key) {
    let prop = this.state[key];

    if (typeof(prop) === 'undefined') {
      return;
    }
    else if (key === 'stationName' || key === 'name') {
      return prop.length > 0 ? 'success' : 'error';
    }
    else if (key === 'email') {
      return validator.isEmail(prop) ? 'success' : 'error';
    }
    else if (key === 'phone' || key === 'zipCode') {
      return validator.isNumeric(prop) ? 'success' : 'error';
    }
    else if (typeof(prop) === 'string') {
      return prop.length > 0 ? 'success' : 'error';
    }
  }

  handleChange(e) {
    const field = e.target.id;
    const value = e.target.value;
    const state = {};

    state[field] = value;

    let values = this.getFormValue();
    this.setState(state);
    values[field] = value
    this.props.onChange(values);
  }

  render() {
    const {stationName, name, email, phone, zipCode, city, district, detail} = this.state;

    return (
      <form>
        <Row>
          <Col xs={12} md={6}>
            <Input type="text" label="名稱" hasFeedback id="stationName"
              bsStyle={this.validationState('stationName')}
              onChange={this.handleChange}
              value={stationName} />
          </Col>
        </Row>
        <h4><Label bsStyle="default">聯絡人資訊</Label></h4>
        <Row>
          <Col xs={12} md={4}>
            <Input type="text" label="姓名" hasFeedback id="name"
              bsStyle={this.validationState('name')}
              onChange={this.handleChange}
              value={name} />
          </Col>
          <Col xs={12} md={4}>
            <Input type="email" label="email" hasFeedback id="email"
              bsStyle={this.validationState('email')}
              onChange={this.handleChange}
              value={email} />
          </Col>
          <Col xs={12} md={4}>
            <Input type="number" label="電話" hasFeedback id="phone"
              bsStyle={this.validationState('phone')}
              onChange={this.handleChange}
              value={phone} />
          </Col>
        </Row>
        <hr/>
        <h4><Label bsStyle="default">寄送資訊</Label></h4>
        <Row>
          <Col xs={12} md={3}>
            <Input type="number" label="郵遞區號" hasFeedback id="zipCode"
              bsStyle={this.validationState('zipCode')}
              onChange={this.handleChange}
              value={zipCode} />
          </Col>
          <Col xs={12} md={4}>
            <Input type="text" label="市/縣" hasFeedback id="city"
              bsStyle={this.validationState('city')}
              onChange={this.handleChange}
              value={city} />
          </Col>
          <Col xs={12} md={4}>
            <Input type="text" label="區" hasFeedback id="district"
              bsStyle={this.validationState('district')}
              onChange={this.handleChange}
              value={district} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Input type="text" label="地址" hasFeedback id="detail"
              bsStyle={this.validationState('detail')}
              onChange={this.handleChange}
              value={detail} />
          </Col>
        </Row>
      </form>
    );
  }
}
