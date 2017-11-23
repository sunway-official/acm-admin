import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import LandingPageForm from './landingPageForm';
import { queries, mutations } from './helpers';
import { connect } from 'react-redux';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.conference_id,
    };
    this.saveInformation = this.saveInformation.bind(this);
    this.insertLandingPage = this.insertLandingPage.bind(this);
  }
  insertLandingPage(values) {
    const { INSERT_LANDING_PAGE_MUTATION } = this.props;
    INSERT_LANDING_PAGE_MUTATION({
      variables: {
        conference_id: this.props.conference_id,
        slogan: values.slogan,
        register_description: values.register_description,
        call_paper_description: values.call_paper_description,
        speaker_description: values.speaker_description,
        email: values.email,
        facebook_id: values.facebook_id,
        linkedin_id: values.linkedin_id,
        twitter_id: values.twitter_id,
        phone_number: values.phone_number,
      },
      refetchQueries: [
        {
          query: queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
          variables: { conference_id: this.props.conference_id },
        },
      ],
    });
  }
  saveInformation(values) {
    const { UPDATE_LANDING_PAGE_MUTATION } = this.props;
    UPDATE_LANDING_PAGE_MUTATION({
      variables: {
        id: values.id,
        slogan: values.slogan,
        register_description: values.register_description,
        call_paper_description: values.call_paper_description,
        speaker_description: values.speaker_description,
        email: values.email,
        facebook_id: values.facebook_id,
        linkedin_id: values.linkedin_id,
        twitter_id: values.twitter_id,
        phone_number: values.phone_number,
      },
      refetchQueries: [
        {
          query: queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
          variables: { conference_id: values.conference_id },
        },
      ],
    });
    window.alert('success');
  }
  render() {
    const { loading, getLandingPageByConferenceId } = this.props.data;
    if (loading) return <div>loading</div>;
    const landingPage = getLandingPageByConferenceId[0];
    return (
      <div className="conference">
        <Subheader className="subheader"> Landing Page Management</Subheader>
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
          <span>Landing Page</span>
        </div>
        <div className="dashboard content d-flex">
          <LandingPageForm
            landingPage={landingPage}
            onSubmit={
              !landingPage ? this.insertLandingPage : this.saveInformation
            }
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    id: state.auth.currentUser.currentConference.id,
  };
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(mutations.INSERT_LANDING_PAGE_MUTATION, {
    name: 'INSERT_LANDING_PAGE_MUTATION',
  }),
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {}),
  graphql(mutations.UPDATE_LANDING_PAGE_MUTATION, {
    name: 'UPDATE_LANDING_PAGE_MUTATION',
  }),
)(Index);
