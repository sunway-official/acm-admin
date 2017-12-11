import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries } from './helpers';
import ParticipantList from './participantList';
import { connect } from 'react-redux';
import Loading from '../../../../components/render/renderLoading';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }
  render() {
    const {
      loading,
      getAllParticipantsInConference,
    } = this.props.GET_ALL_PARTICIPANTS_IN_CONFERENCE_QUERY;
    if (loading) return <Loading />;
    const listParticipant = getAllParticipantsInConference;
    return (
      <div className="conference">
        <Subheader className="subheader"> Participants Management</Subheader>
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
          <span>Participants Management</span>
        </div>
        <div className="dashboard content d-flex">
          <ParticipantList listParticipant={listParticipant} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state.auth.currentUser && state.auth.currentUser.currentConference) {
    return {
      id: state.auth.currentUser.currentConference.id,
    };
  }
};
export default compose(
  connect(mapStateToProps, undefined),
  graphql(queries.GET_ALL_PARTICIPANTS_IN_CONFERENCE_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.id },
    }),
    name: 'GET_ALL_PARTICIPANTS_IN_CONFERENCE_QUERY',
  }),
)(Index);
