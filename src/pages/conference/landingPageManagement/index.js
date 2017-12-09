import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import LandingPageForm from './landingPageForm';
import { queries, mutations } from './helpers';
import { connect } from 'react-redux';
import {
  alertOptions,
  MyExclamationTriangle,
  MyFaCheck,
} from '../../../theme/alert';
import AlertContainer from 'react-alert';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.conference_id,
    };
    this.saveInformation = this.saveInformation.bind(this);
    this.insertLandingPage = this.insertLandingPage.bind(this);
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
  async insertLandingPage(values) {
    const { INSERT_LANDING_PAGE_MUTATION } = this.props;
    try {
      await INSERT_LANDING_PAGE_MUTATION({
        variables: {
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
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }
  async saveInformation(values) {
    const { UPDATE_LANDING_PAGE_MUTATION } = this.props;
    try {
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
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }
  render() {
    const {
      loading,
      getLandingPageByConferenceId,
    } = this.props.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY;
    if (loading) return <div>loading</div>;
    const landingPage = getLandingPageByConferenceId[0];
    return (
      <div className="conference">
        <Subheader className="subheader"> Landing Page Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
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
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
    name: 'GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY',
  }),
  graphql(mutations.UPDATE_LANDING_PAGE_MUTATION, {
    name: 'UPDATE_LANDING_PAGE_MUTATION',
  }),
)(Index);
