import React, { Component } from 'react';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker, TextField, ListItem } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (event, index, value) => this.setState({ value });
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xsOffset={1} xs={4}>
              <Row className="personalRow">
                <Col>
                  <ListItem
                    className="list-item"
                    primaryText="Name"
                    leftIcon={<ActionPermIdentity />}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <ListItem
                    className="list-item"
                    primaryText="Gender"
                    leftIcon={<NotificationWC />}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <ListItem
                    className="list-item"
                    primaryText="Email"
                    leftIcon={<CommunicationMailOutline />}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <ListItem
                    className="list-item"
                    primaryText="Birthday"
                    leftIcon={<SocialCake />}
                    disabled={true}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={3}>
              <Row className="personalRow">
                <Col>
                  <TextField
                    hintText="First Name"
                    id="text-field-default"
                    defaultValue="Le Quoc Manh"
                  />
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected="male"
                    className="radioGender"
                  >
                    <RadioButton value="male" label="Male" />
                    <RadioButton value="female" label="Female" />
                  </RadioButtonGroup>
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <TextField
                    hintText="Email"
                    id="text-field-default"
                    defaultValue="lequocmanh@gmail.com"
                  />
                </Col>
              </Row>
              <Row className="personalRow">
                <Col>
                  <DatePicker hintText="BirthDay" autoOk={true} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xsOffset={2} xs={3}>
              <RaisedButton
                className="btn save-change"
                label="Save Change"
                primary={true}
              />
            </Col>
            <Col xs={4}>
              <RaisedButton
                className="btn cancel"
                label="Cancel"
                secondary={true}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
