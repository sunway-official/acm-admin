import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import TopicDetail from './topicDetail';

class Index extends Component {
  constructor(props) {
    super(props);
    this.saveInformation = this.saveInformation.bind(this);
    this.insertTopic = this.insertTopic.bind(this);
  }
  insertTopic(values) {
    const { INSERT_TOPIC_MUTATION } = this.props;
    INSERT_TOPIC_MUTATION({
      variables: {
        name: values.name,
        description: values.description,
        color_id: values.color_id,
      },
      // refetchQueries: [
      //   {
      //     query: queries.GET_TOPIC_BY_ID_QUERY,
      //     variables: { id: this.props.match.params.topic_id },
      //   },
      // ],
    });
    window.alert('success');
  }
  saveInformation(values) {
    const { UPDATE_TOPIC_MUTATION } = this.props;
    UPDATE_TOPIC_MUTATION({
      variables: {
        id: values.id,
        name: values.name,
        description: values.description,
        color_id: values.color_id,
      },
      refetchQueries: [
        {
          query: queries.GET_TOPIC_BY_ID_QUERY,
          variables: { id: this.props.match.params.topic_id },
        },
      ],
    });
    window.alert('success');
  }
  render() {
    const { loading, getTopicByID } = this.props.data;
    if (loading) return <div>loading</div>;
    const topicDetail = getTopicByID;
    const colorsList = this.props.GET_ALL_COLORS_QUERY.getAllColors;
    return (
      <div className="conference">
        <Subheader className="subheader"> Topic Detail</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
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
          <span>Topic Detail</span>
        </div>
        <div className="dashboard content d-flex">
          <TopicDetail
            topicDetail={topicDetail}
            colorsList={colorsList}
            onSubmit={!topicDetail ? this.insertTopic : this.saveInformation}
          />
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(queries.GET_TOPIC_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.topic_id },
    }),
  }),
  graphql(mutations.UPDATE_TOPIC_MUTATION, {
    name: 'UPDATE_TOPIC_MUTATION',
  }),
  graphql(mutations.INSERT_TOPIC_MUTATION, {
    name: 'INSERT_TOPIC_MUTATION',
  }),
  graphql(queries.GET_ALL_COLORS_QUERY, {
    name: 'GET_ALL_COLORS_QUERY',
  }),
)(Index);
