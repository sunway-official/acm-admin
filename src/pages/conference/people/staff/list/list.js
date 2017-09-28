import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import Status from './status';
import Action from './action';
import { style } from './style.css';
// import Add from './add';

const tableData = [
  {
    name: 'Pham Van Tri',
  },
  {
    name: 'Le Thi Thuy Dung',
  },
  {
    name: 'Le Quoc Manh',
  },
  {
    name: 'Le Dinh Nhat Khanh',
  },
  {
    name: 'Ly Bao Khanh',
  },
  {
    name: 'Thai Thi Hong Minh',
  },
  {
    name: 'Lu Thanh Vinh',
  },
  {
    name: 'Tran Van Thuc',
  },
  {
    name: 'Ly Bao Khanh',
  },
  {
    name: 'Thai Thi Hong Minh',
  },
  {
    name: 'Lu Thanh Vinh',
  },
  {
    name: 'Tran Van Thuc',
  },
];
class Index extends Component {
  render() {
    return (
      <div className="d-flex">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="list staff">
          <Table fixedHeader={true}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>
                    <Status />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Action />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Index;
//<div className="button new mobile">
//   <Add />
// </div>
