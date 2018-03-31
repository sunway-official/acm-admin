import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import Form from './Form';
class Index extends Component {
  render() {
    const { loading, getCurrentConference } = this.props.GET_CURRENT_CONFERENCE;
    let conference, initialValues;
    if (getCurrentConference) {
      conference = getCurrentConference;
      initialValues = {
        dl_submit_abstract: new Date(conference.dl_submit_abstract),
        dl_review_abstract: new Date(conference.dl_review_abstract),
        dl_release_abstract: new Date(conference.dl_release_abstract),
        dl_re_submit_abstract: new Date(conference.dl_re_submit_abstract),
        dl_re_review_abstract: new Date(conference.dl_re_review_abstract),
        dl_release_final_abstract: new Date(
          conference.dl_release_final_abstract,
        ),
        dl_submit_paper: new Date(conference.dl_submit_paper),
        dl_review_paper: new Date(conference.dl_review_paper),
        dl_release_paper: new Date(conference.dl_release_paper),
        dl_re_submit_paper: new Date(conference.dl_re_submit_paper),
        dl_re_review_paper: new Date(conference.dl_re_review_paper),
        dl_release_final_paper: new Date(conference.dl_release_final_paper),
      };
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    return <Form initialValues={initialValues} />;
  }
}

export default compose(
  graphql(queries.GET_CURRENT_CONFERENCE, {
    name: 'GET_CURRENT_CONFERENCE',
  }),
)(Index);
