import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import Form from './Form';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';

import Loading from 'components/render/renderLoading';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  async handleUpdate(values) {
    try {
      await this.props.UPDATE_CONFERENCE_MUTATION({
        variables: {
          id: this.props.conferenceId,
          dl_submit_abstract: values.dl_submit_abstract,
          dl_review_abstract: values.dl_review_abstract,
          dl_release_abstract: values.dl_release_abstract,
          dl_re_submit_abstract: values.dl_re_submit_abstract,
          dl_re_review_abstract: values.dl_re_review_abstract,
          dl_release_final_abstract: values.dl_release_final_abstract,
          dl_submit_paper: values.dl_submit_paper,
          dl_review_paper: values.dl_review_paper,
          dl_release_paper: values.dl_release_paper,
          dl_re_submit_paper: values.dl_re_submit_paper,
          dl_re_review_paper: values.dl_re_review_paper,
          dl_release_final_paper: values.dl_release_final_paper,
        },
      });
      this.showAlertSuccess();
    } catch (error) {
      console.log(error);
    }
  }

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
      return <Loading />;
    }
    return (
      <div>
        <Form initialValues={initialValues} onSubmit={this.handleUpdate} />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_CURRENT_CONFERENCE, {
    name: 'GET_CURRENT_CONFERENCE',
  }),
  graphql(mutations.UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
)(Index);
