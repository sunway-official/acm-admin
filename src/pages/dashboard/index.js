import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { graphql, compose } from 'react-apollo';
import ListConferences from './render/listConferences';
import style from './style.css';

class Index extends Component {
  render() {
    console.log(this.props.me);
    const id = this.props.me.id;
    const firstName = this.props.me.firstname;
    let lastName = this.props.me.lastname;
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="dashboard content">
          <div className="dashboard-title">
            Welcome {lastName + ' ' + firstName} !!
          </div>
          <ListConferences id={id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.currentUser,
});

export default compose(withRouter, withApollo, connect(mapStateToProps))(Index);
