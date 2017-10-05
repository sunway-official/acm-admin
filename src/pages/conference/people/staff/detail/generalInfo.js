import React from 'react';
import './style.css';
import { connect } from 'react-redux';
export default class GeneralInfo extends React.Component {
  render() {
    const me = this.props.me;
    console.log(me);
    return (
      <div>
        <div className="profile-usertitle-name"> Le Quoc Manh </div>
        <div className="profile-usertitle-job"> Developer </div>
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const data = ownProps.data;
//   return {
//     initialValue: {
//       firstname: data.me.firstname,
//     },
//   };
// };

//export default connect(mapStateToProps, undefined)(GeneralInfo);
