import React from 'react';
import Calendar from './calendar';

import { connect } from 'react-redux';

const Index = props => {
  return <Calendar conference={props.conference} />;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    conference: state.auth.currentUser.currentConference,
  };
};

export default connect(mapStateToProps, undefined)(Index);
