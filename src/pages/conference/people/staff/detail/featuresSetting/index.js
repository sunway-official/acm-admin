import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import { style } from './style.css';
import { RaisedButton } from 'material-ui';
import Toggle from 'material-ui/Toggle';

const tableData = [
  {
    feature: 'Create Schedule',
  },
  {
    feature: 'Update Schedule',
  },
  {
    feature: 'Staff Management',
  },
  {
    feature: 'Manage Personal Information',
  },
];

export default class Index extends Component {
  render() {
    return (
      <div className="d-flex">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="list feature">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Feature</TableHeaderColumn>
                <TableHeaderColumn />
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.feature}</TableRowColumn>
                  <TableRowColumn />
                  <TableRowColumn>
                    <Toggle defaultToggled={true} />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <RaisedButton
              className="btn save-change"
              label="Save Change"
              primary={true}
            />
            <RaisedButton
              className="btn cancel"
              label="Cancel"
              secondary={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
