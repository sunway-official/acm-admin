import React, { Component } from 'react';
import {
  Subheader,
  IconButton,
  CircularProgress,
  RaisedButton,
} from 'material-ui';
import AddDialog from './insert/addDialog';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import List from './list';
import { graphql, gql, compose } from 'react-apollo';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleOpenAddDialog = this.handleOpenAddDialog.bind(this);
    this.handleCloseAddDialog = this.handleCloseAddDialog.bind(this);
  }
  state = {
    openDialog: false,
    userId: 0,
  };
  handleOpenAddDialog() {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  }
  handleCloseAddDialog() {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  }
  render() {
    let allUsers;
    const { getAllUsers } = this.props.GET_ALL_USERS;
    if (getAllUsers) {
      allUsers = getAllUsers;
    } else return <div>Loading...</div>;
    const { loading } = this.props.data;
    if (loading)
      return (
        <div>
          <CircularProgress />
        </div>
      );

    const staffs = this.props.data.getAllStaffInConference;
    return (
      <div className="conference">
        <Subheader className="subheader"> Staff List</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>People</span>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Staff</span>
        </div>
        <div className="dashboard content">
          <List
            staffs={staffs}
            conference_id={this.props.match.params.conference_id}
          />
          <RaisedButton
            onClick={() => this.handleOpenAddDialog()}
            primary={true}
            label="Add New Staff"
          />
        </div>
        <AddDialog
          allUsers={allUsers}
          id={this.state.userId}
          open={this.state.openDialog}
          handleClose={this.handleOpenAddDialog}
        />
      </div>
    );
  }
}

export const GET_ALL_STAFF_IN_CONFERENCE = gql`
  query getAllStaffInConference($conference_id: ID!) {
    getAllStaffInConference(conference_id: $conference_id) {
      id
      firstname
      lastname
      email
      dob
      gender
    }
  }
`;
const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      firstname
      lastname
    }
  }
`;
export default compose(
  graphql(GET_ALL_STAFF_IN_CONFERENCE, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.conference_id },
    }),
  }),
  graphql(GET_ALL_USERS, {
    name: 'GET_ALL_USERS',
  }),
)(Index);
