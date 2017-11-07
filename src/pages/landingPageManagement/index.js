import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import LandingPageForm from './landingPageForm';
import { queries, mutations } from './helpers';

class Index extends Component {
  constructor(props) {
    super(props);
    this.saveInformation = this.saveInformation.bind(this);
  }
  saveInformation(values) {
    const { UPDATE_LANDING_PAGE_MUTATION } = this.props;
    UPDATE_LANDING_PAGE_MUTATION({
      variables: {
        id: '1',
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
          variables: { conference_id: '2' },
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
            onSubmit={this.saveInformation}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: '2' },
    }),
  }),
  graphql(mutations.UPDATE_LANDING_PAGE_MUTATION, {
    name: 'UPDATE_LANDING_PAGE_MUTATION',
  }),
)(Index);
