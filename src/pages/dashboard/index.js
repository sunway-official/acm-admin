import React from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashboardMenu from './renderDashboard/menu';
import Conferences from './renderDashboard/conferences';
import style from './style.css';
import { Card } from 'material-ui/Card';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome } from 'material-ui/svg-icons';

function DashboardIndex(props) {
  const user_id = props.me && props.me.id;
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <Subheader className="subheader conf-infor-title">
        Academic conference management
      </Subheader>
      <div className="page-breadcrumb d-flex">
        <Link className="d-flex" to="/">
          <IconButton>
            <ActionHome />
          </IconButton>
          <span>Dashboard</span>
        </Link>
      </div>
      <DashboardMenu />
      <div className="dashboard content data">
        <Card className="card-content-dashboard" />
        <Conferences user_id={user_id} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(
  DashboardIndex,
);
