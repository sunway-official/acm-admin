import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import { queries as scheduleQueries } from '../../../schedule/helpers';
import RoomDetail from './roomDetail';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.saveInformation = this.saveInformation.bind(this);
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
      onClose: () => {
        this.props.history.replace('/conference/rooms-management');
      },
    });
  };
  async saveInformation({ id, name, seats, status }) {
    const { UPDATE_ROOM_IN_CONFERENCE_MUTATION } = this.props;
    try {
      await UPDATE_ROOM_IN_CONFERENCE_MUTATION({
        variables: {
          id: id,
          name: name,
          seats: seats,
          status: status,
        },
        refetchQueries: [
          {
            query: queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY,
          },
          {
            query: scheduleQueries.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY,
            variables: { status: 'on' },
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
    const { loading, getRoomByID } = this.props.GET_ROOM_BY_ID_QUERY;
    if (loading) return <Loading />;
    const roomDetail = getRoomByID;
    return (
      <div className="conference">
        <Subheader className="subheader">
          {localStorage.getItem('conferenceTitle')}
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link className="d-flex" to="/conference/rooms-management">
            <span>Rooms Management</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Room Detail</span>
        </div>
        <div className="dashboard content d-flex">
          <RoomDetail roomDetail={roomDetail} onSubmit={this.saveInformation} />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
  (withRouter, connect(mapStateToProps, undefined)),
  graphql(queries.GET_ROOM_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.room_id },
    }),
    name: 'GET_ROOM_BY_ID_QUERY',
  }),
  graphql(mutations.UPDATE_ROOM_IN_CONFERENCE_MUTATION, {
    name: 'UPDATE_ROOM_IN_CONFERENCE_MUTATION',
  }),
)(Index);
