import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { queries } from '../helpers';
import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
} from 'material-ui';
import Topic from '../topic';

class Index extends Component {
  render() {
    const { loading, getAllPapers } = this.props.data;
    if (loading) return <div>Loading..</div>;
    const papers = getAllPapers;
    return (
      <Table fixedHeader={true}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>No.</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Topic</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {papers.map((paper, index) => (
            <TableRow key={index}>
              <TableRowColumn>{index + 1}</TableRowColumn>
              <TableRowColumn>{paper.title}</TableRowColumn>
              <TableRowColumn>
                <Topic paper={paper} />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default graphql(queries.GET_ALL_PAPERS)(Index);
