import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  Dialog,
} from 'material-ui';
import './style.css';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../helpers';
class TopicList extends Component {
  constructor() {
    super();
    this.state = {
      openDelete: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleOpenDelete(topic_id) {
    this.setState({ openDelete: true });
    this.setState({
      topic_id: topic_id,
    });
  }
  handleClose() {
    this.setState({ openDelete: false });
  }
  handleDelete() {
    this.setState({ openDelete: false });
    const { DELETE_TOPIC_MUTATION } = this.props;
    DELETE_TOPIC_MUTATION({
      variables: {
        id: this.state.topic_id,
      },
      refetchQueries: [
        {
          query: queries.GET_TOPICS_OF_CONFERENCE_QUERY,
        },
      ],
    });
  }
  render() {
    const listTopic = this.props.listTopic;
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton label="No" onClick={this.handleClose} />,
    ];
    return (
      <div>
        <div>
          <Table fixedHeader={true} selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn className="index-column">
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Topic Color</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {listTopic.map((topic, index) => {
                return (
                  <TableRow key={topic.id}>
                    <TableRowColumn className="index-column">
                      {index + 1}
                    </TableRowColumn>
                    <TableRowColumn>{topic.name}</TableRowColumn>
                    <TableRowColumn style={{ background: topic.color_code }} />
                    <TableRowColumn>
                      <Link
                        to={`/conference/topics-management/topic-detail/${topic.id}`}
                      >
                        <RaisedButton label="Edit" primary={true} />
                      </Link>
                      <RaisedButton
                        label="Delete"
                        onClick={() => this.handleOpenDelete(topic.id)}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog
            title="Do you want to delete this color?"
            modal={true}
            onRequestClose={this.handleClose}
            open={this.state.openDelete}
            actions={actionDelete}
          />
          <div className="d-flex btn-group">
            <Link to={`/conference/topics-management/topic-detail`}>
              <RaisedButton label="Add Topic" primary={true} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(mutations.DELETE_TOPIC_MUTATION, {
  name: 'DELETE_TOPIC_MUTATION',
})(TopicList);
