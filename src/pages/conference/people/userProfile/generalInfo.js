import React from 'react';
import './style.css';
export default class GeneralInfo extends React.Component {
  render() {
    const fullname = this.props.me.lastname + ' ' + this.props.me.firstname;
    return (
      <div>
        <div className="profile-usertitle-name">{fullname}</div>
        <div className="profile-usertitle-job"> {this.props.me.position} </div>
      </div>
    );
  }
}
