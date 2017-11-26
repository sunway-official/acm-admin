import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import { paperActions } from 'store/ducks/paper';
import { Link } from 'react-router-dom';

import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
  RaisedButton,
} from 'material-ui';
import { ActionNoteAdd } from 'material-ui/svg-icons';
import Topic from '../topic';
import DeletePaper from './deletePaper';
class Index extends Component {
  constructor(props) {
    super(props);
    this.handleDialog = this.handleDialog.bind(this);
  }
  state = {
    paper_id: 0,
  };
  styles = {
    margin: 10,
  };
  handleDialog(paper, paper_id) {
    this.setState({ paper_id: paper_id });
    this.props.setPaper(paper);
    this.props.setToggle();
  }

  render() {
    const { loading, getAllPapers } = this.props.data;
    if (loading) return <div>Loading..</div>;
    let papers;
    if (getAllPapers) {
      papers = getAllPapers;
    }
    return (
      <div>
        <Table fixedHeader={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>No.</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Topic</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
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
                <TableRowColumn>
                  <RaisedButton
                    label="Edit"
                    style={this.styles}
                    primary={true}
                  />
                  <RaisedButton
                    label="Delete"
                    onClick={() => this.handleDialog(paper, paper.id)}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DeletePaper id={this.state.paper_id} />
        <Link to="/conference/paper/add">
          <RaisedButton
            icon={<ActionNoteAdd />}
            primary={true}
            label={'Add New Paper'}
          />
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setPaper: paper => dispatch(paperActions.setPaper(paper)),
    setToggle: () => dispatch(paperActions.setToggle()),
  };
};
export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(queries.GET_ALL_PAPERS),
)(Index);
