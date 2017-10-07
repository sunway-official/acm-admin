import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { TextField, ListItem } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
                  disabled={true}
                  id="text-field-default"
                  defaultValue="Le Quoc Manh"
                  underlineShow={false}
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
                  disabled={true}
                  id="text-field-default"
                  defaultValue="lequocmanh@gmail.com"
                  underlineShow={false}
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
                <TextField
                  disabled={true}
                  id="text-field-default"
                  defaultValue="13-03-1996"
                  underlineShow={false}
                />
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}
