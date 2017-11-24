import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import RoomDetail from './roomDetail';
import { connect } from 'react-redux';

class AddNewRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.insertRoom = this.insertRoom.bind(this);
  }
  insertRoom(values) {
    const { INSERT_ROOM_MUTATION } = this.props;
    INSERT_ROOM_MUTATION({
      variables: {
        conference_id: this.props.id,
        name: values.name,
        seats: values.seats,
        status: values.status,
      },
      refetchQueries: [
        {
          query: queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY,
        },
      ],
    });
    window.alert('success');
  }
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">Add New Room</Subheader>
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
          <Link className="d-flex" to="/conference/rooms-management">
            <span>Rooms Management</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Add New Room</span>
        </div>
        <div className="dashboard content d-flex">
          <RoomDetail onSubmit={this.insertRoom} />
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
  graphql(mutations.INSERT_ROOM_MUTATION, {
    name: 'INSERT_ROOM_MUTATION',
  }),
  graphql(queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY),
)(AddNewRoom);
