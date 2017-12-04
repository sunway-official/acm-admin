import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { mutations, queries } from '../helpers';
import { withRouter } from 'react-router';
import Form from './form';
class Index extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  async handleAdd(values) {
    const arrActiveTopics = [];
    values.topics.forEach(function(value, index) {
      if (value === true) {
        arrActiveTopics.push(index);
      }
    });
    try {
      const paper = await this.props.INSERT_PAPER({
        variables: {
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
        },
      });
      // eslint-disable-next-line array-callback-return
      arrActiveTopics.map(topic_id => {
        this.props.INSERT_PAPER_TOPIC({
          variables: {
            paper_id: paper.data.insertPaper.id,
            topic_id: topic_id,
          },
          refetchQueries: [
            {
              query: queries.GET_PAPERS_BY_CONFERENCE_ID,
              variables: {
                conference_id: this.props.conference_id,
              },
            },
          ],
        });
      });
      this.props.history.replace('/conference/papers');
    } catch (error) {
      throw error;
    }
  }
  render() {
    const {
      loading,
      getTopicsOfConference,
    } = this.props.GET_TOPICS_OF_CONFERENCE;
    let topics;
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    if (loading) return <div>Loading...</div>;
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
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
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Paper Management</span>
        </div>
        <div className="dashboard content d-flex">
          <Form onSubmit={this.handleAdd} topics={topics} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state) {
    return {
      topic: state.topics.data,
      conference_id: state.auth.currentUser.currentConference.id,
    };
  }
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(mutations.INSERT_PAPER_TOPIC, {
    name: 'INSERT_PAPER_TOPIC',
  }),
  graphql(mutations.INSERT_PAPER, {
    name: 'INSERT_PAPER',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
)(Index);
