import React from 'react';
import Calendar from './calendar';

import { queries } from './helpers';
import { graphql } from 'react-apollo';
import './css/style.css';

const Index = props => {
  const { loading, getConferenceByID } = props.data;

  if (loading) return <div>loading</div>;
  const conference = getConferenceByID;
  return <Calendar conference={conference} />;
};

export default graphql(queries.GET_CONFERENCE_BY_ID, {
  options: ownProps => ({
    variables: { id: ownProps.match.params.id },
  }),
})(Index);
