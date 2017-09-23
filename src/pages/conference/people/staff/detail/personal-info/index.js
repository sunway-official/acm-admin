import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker, TextField, ListItem } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (event, index, value) => this.setState({ value });
  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
          >
            <TableRow>
              <TableRowColumn className="first-column">
                <ListItem
                  className="list-item"
                  primaryText="Name"
                  leftIcon={<ActionPermIdentity />}
                  disabled={true}
                />
              </TableRowColumn>
              <TableRowColumn className="second-column">
                <TextField
                  hintText="First Name"
                  id="text-field-default"
                  defaultValue="Lu Thanh Vinh"
                />
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
            <TableRow>
              <TableRowColumn className="first-column">
                <ListItem
                  className="list-item"
                  primaryText="Gender"
                  leftIcon={<NotificationWC />}
                  disabled={true}
                />
              </TableRowColumn>
              <TableRowColumn className="second-column">
                <RadioButtonGroup
                  name="shipSpeed"
                  defaultSelected="male"
                  className="radio gender"
                >
                  <RadioButton value="male" label="Male" />
                  <RadioButton value="female" label="Female" />
                </RadioButtonGroup>
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
            <TableRow>
              <TableRowColumn className="first-column">
                <ListItem
                  className="list-item"
                  primaryText="Email"
                  leftIcon={<CommunicationMailOutline />}
                  disabled={true}
                />
              </TableRowColumn>
              <TableRowColumn className="second-column">
                <TextField
                  hintText="Email"
                  id="text-field-default"
                  defaultValue="luthanhvinhdtu@gmail.com"
                />
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
            <TableRow>
              <TableRowColumn className="first-column">
                <ListItem
                  className="list-item"
                  primaryText="Birthday"
                  leftIcon={<SocialCake />}
                  disabled={true}
                />
              </TableRowColumn>
              <TableRowColumn className="second-column">
                <DatePicker hintText="BirthDay" autoOk={true} />
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <RaisedButton
            className="btn save-change"
            label="Save Change"
            primary={true}
          />
          <RaisedButton className="btn cancel" label="Cancel" primary={true} />
        </div>
      </div>
    );
  }
}
