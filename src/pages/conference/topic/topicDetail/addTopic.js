import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import TopicDetail from './topicDetail';
import { withRouter } from 'react-router';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';

class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.insertTopic = this.insertTopic.bind(this);
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
      onClose: () => {
        this.props.history.replace('/conference/topics-management');
      },
    });
  };
  async insertTopic(values) {
    const { INSERT_TOPIC_IN_CONFERENCE_MUTATION } = this.props;
    try {
      await INSERT_TOPIC_IN_CONFERENCE_MUTATION({
        variables: {
          name: values.name,
          description: values.description,
          color_id: values.color_id,
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
    const { loading, getAllColors } = this.props.GET_ALL_COLORS_QUERY;
    if (loading) return <Loading />;
    const colorsList = getAllColors;
    return (
      <div className="conference">
        <Subheader className="subheader">Add New Topic</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link className="d-flex" to="/conference/topics-management">
            <span>Topics Management</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Add New Topic</span>
        </div>
        <div className="dashboard content d-flex">
          <TopicDetail colorsList={colorsList} onSubmit={this.insertTopic} />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(mutations.INSERT_TOPIC_IN_CONFERENCE_MUTATION, {
    name: 'INSERT_TOPIC_IN_CONFERENCE_MUTATION',
  }),
  graphql(queries.GET_ALL_COLORS_QUERY, {
    name: 'GET_ALL_COLORS_QUERY',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE_QUERY, {
    name: 'GET_TOPICS_OF_CONFERENCE_QUERY',
  }),
)(AddTopic);
