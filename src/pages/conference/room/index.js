import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql } from 'react-apollo';
import { queries } from './helpers';
import RoomList from './roomList';

class Index extends Component {
  render() {
    const { loading } = this.props.data;
    if (loading) return <div>loading...</div>;
    const listRoom = this.props.data.getRoomsByConferenceID;
    return (
      <div className="conference">
        <Subheader className="subheader"> Rooms Management</Subheader>
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
          <span>Rooms Management</span>
        </div>
        <div className="dashboard content d-flex">
          <RoomList listRoom={listRoom} />
        </div>
      </div>
    );
  }
}
export default graphql(queries.GET_ROOMS_BY_CONFERENCE_ID_QUERY, {
  options: ownProps => ({
    variables: { conference_id: '1' },
  }),
})(Index);
