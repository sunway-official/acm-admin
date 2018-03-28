import React from 'react';
import SetDeadlineForm from './Form';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import { connect } from 'react-redux';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateDeadline = this.handleUpdateDeadline.bind(this);
  }
  async handleUpdateDeadline(values) {
    if (this.props.stepIndex == 1) {
      console.log('submit');
      try {
        await this.props.UPDATE_CONFERENCE_MUTATION({
          variables: {
            id: this.props.GET_CURRENT_CONFERENCE.getCurrentConference.id,
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
      } catch (error) {
        console.log(error);
      }
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
      return <div>Loading...</div>;
    }

    return (
      <SetDeadlineForm
        initialValues={initialValues}
        onSubmit={this.handleUpdateDeadline}
      />
    );
  }
}
const mapStateToProps = state => {
  if (state) {
    console.log(state.conference.stepIndex);
    return { stepIndex: state.conference.stepIndex };
  }
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(queries.GET_CURRENT_CONFERENCE, {
    name: 'GET_CURRENT_CONFERENCE',
  }),
  graphql(mutations.UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
)(Index);
