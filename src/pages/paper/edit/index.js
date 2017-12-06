import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import Form from './form';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  async handleSave(values) {
    console.log(values.topics);
    const arrActiveTopics = [],
      arrAdjectiveTopics = [];
    const { UPDATE_PAPER } = this.props;
    if (values.topics) {
      values.topics.forEach(function(value, index) {
        if (value === true) {
          arrActiveTopics.push(index);
        }
      });
    }
    if (values.topics) {
      values.topics.forEach(function(value, index) {
        if (value === false) {
          arrAdjectiveTopics.push(index);
        }
      });
    }
    console.log('FALSE', arrAdjectiveTopics);
    console.log('TRUE', arrActiveTopics);
    try {
      await UPDATE_PAPER({
        variables: {
          id: values.id,
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
        },
      });
      // eslint-disable-next-line array-callback-return
      arrActiveTopics.map(topic_id => {
        this.props.INSERT_PAPER_TOPIC({
          variables: {
            paper_id: values.id,
            topic_id: topic_id,
          },
        });
      });
      // eslint-disable-next-line array-callback-return
      arrAdjectiveTopics.map(topic_id => {
        this.props.DELETE_PAPER_TOPIC({
          variables: {
            paper_id: values.id,
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
      throw console.log({ error });
    }
  }
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingTopics = this.props.GET_TOPICS_OF_CONFERENCE.loading;
    const loadingPaperTopics = this.props.GET_TOPICS_BY_PAPER_ID.loading;
    const { getPaperByID } = this.props.GET_PAPER_BY_ID;
    const { getTopicsOfConference } = this.props.GET_TOPICS_OF_CONFERENCE;
    const { getTopicsByPaperID } = this.props.GET_TOPICS_BY_PAPER_ID;
    if (loadingPaper || loadingTopics || loadingPaperTopics)
      return <div>Loading...</div>;
    let paper;
    let allTopics;
    let paperTopicsActive;
    let initialValues;
    if (getPaperByID) {
      paper = getPaperByID;
      initialValues = {
        id: paper.id,
        title: paper.title,
        abstract: paper.abstract,
        keywords: paper.keywords,
      };
    }
    if (getTopicsOfConference) {
      allTopics = getTopicsOfConference;
    }
    if (getTopicsByPaperID) {
      paperTopicsActive = getTopicsByPaperID;
    }
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
          <Form
            initialValues={initialValues}
            onSubmit={this.handleSave}
            allTopics={allTopics}
            paperTopicsActive={paperTopicsActive}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    return { conference_id: state.auth.currentUser.currentConference.id };
  }
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.GET_TOPICS_BY_PAPER_ID, {
    name: 'GET_TOPICS_BY_PAPER_ID',
    options: ownProps => ({
      variables: {
        paper_id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(mutations.UPDATE_PAPER, {
    name: 'UPDATE_PAPER',
  }),
  graphql(mutations.INSERT_PAPER_TOPIC, {
    name: 'INSERT_PAPER_TOPIC',
  }),
  graphql(mutations.DELETE_PAPER_TOPIC, {
    name: 'DELETE_PAPER_TOPIC',
  }),
)(Index);
