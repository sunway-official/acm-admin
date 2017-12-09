import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton, Dialog } from 'material-ui';
import './style.css';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../helpers';
import AlertContainer from 'react-alert';
import {
  alertOptions,
  MyExclamationTriangle,
  MyFaCheck,
} from '../../../../theme/alert';

const style = {
  textAlign: 'left',
  lineHeight: '200%',
  paddingLeft: '1vw',
};

const sorted = [
  {
    id: 'name',
    desc: false,
  },
];
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
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  handleOpenDelete(topic_id) {
    this.setState({ openDelete: true });
    this.setState({
      topic_id: topic_id,
    });
  }
  handleClose() {
    this.setState({ openDelete: false });
  }
  async handleDelete() {
    this.setState({ openDelete: false });
    const { DELETE_TOPIC_MUTATION } = this.props;
    try {
      await DELETE_TOPIC_MUTATION({
        variables: {
          id: this.state.topic_id,
        },
        refetchQueries: [
          {
            query: queries.GET_TOPICS_OF_CONFERENCE_QUERY,
          },
        ],
      });
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
        minWidth: 100,
        Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
      },
      {
        Header: 'Color',
        accessor: 'color_code',
        minWidth: 100,
        filterable: false,
        Cell: props => (
          <div style={{ background: props.value, height: '100%' }} />
        ), // Custom cell components!
      },
      {
        Header: 'Action',
        minWidth: 100,
        filterable: false,
        accessor: 'id', // String-based value accessors!
        Cell: props => (
          <div className="action-column">
            <Link
              to={`/conference/topics-management/topic-detail/${props.value}`}
            >
              <RaisedButton label="Edit" primary={true} />
            </Link>
            <RaisedButton
              className="marginLeft"
              label="Delete"
              onClick={() => this.handleOpenDelete(props.value)}
            />
          </div>
        ),
      },
    ];
    const listTopic = this.props.listTopic;
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className="react-table">
        <ReactTable
          noDataText="Please add new topic!"
          filterable
          resizable={false}
          data={listTopic}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <Dialog
          title="Do you want to delete this color?"
          modal={true}
          onRequestClose={this.handleClose}
          open={this.state.openDelete}
          actions={actionDelete}
        />
        <div className="d-flex btn-group list-btn-add">
          <Link to={`/conference/topics-management/topic-detail`}>
            <RaisedButton label="Add Topic" primary={true} />
          </Link>
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default graphql(mutations.DELETE_TOPIC_MUTATION, {
  name: 'DELETE_TOPIC_MUTATION',
})(TopicList);
