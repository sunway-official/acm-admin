import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { graphql, compose } from 'react-apollo';
import GetAllConfs from './render/getAllConference';
import style from './style.css';

class Index extends Component {
  render() {
    console.log(this.props.me);
    var id = this.props.me.id;
    var firstName = this.props.me.firstname;
    var lastName = this.props.me.lastname;
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="dashboard content">
          <div className="dashboard-title">
            Welcome {lastName + ' ' + firstName} !!
          </div>
          <GetAllConfs id={this.props.me.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(Index);
