import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import List from './list';
import { connect } from 'react-redux';
class Index extends Component {
  render() {
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
          <span>Staff Managements</span>
        </div>
        <section className="dashboard content">
          <List conference_id={this.props.conference_id} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    return {
      conference_id: state.auth.currentUser.currentConference.id,
    };
  }
};
export default connect(mapStateToProps, undefined)(Index);
