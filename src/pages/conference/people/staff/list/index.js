import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Subheader,
} from 'material-ui';
import Status from './status';
import Action from './action';
class Index extends Component {
  render() {
    return (
      <div>
        <Subheader>
          <h1>Staff Management</h1>
        </Subheader>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
                <Status />
              </TableRowColumn>
              <TableRowColumn>
                <Action />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Index;
