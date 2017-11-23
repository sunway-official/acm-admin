import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashboardMenu from './render/menu';
import Conferences from './render/conferences';
import style from './style.css';
import { Card } from 'material-ui/Card';

class Index extends Component {
  render() {
    const user_id = this.props.me.id;
    const firstName = this.props.me.firstname;
    let lastName = this.props.me.lastname;
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <DashboardMenu />
        <div className="dashboard-title">
          Welcome {lastName + ' ' + firstName} !!
        </div>
        <div className="dashboard content data">
          <Card className="card-content-dashboard">
            {/* <img
              src="./../../../images/conf-dashboard.png"
              alt="conference image"
            /> */}
          </Card>
          <Conferences user_id={user_id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(Index);
