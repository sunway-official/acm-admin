import React, { Component } from 'react';
import ParticipantDetail from './participantDetail';

class Index extends Component {
  render() {
    const participantDetail = this.props.participantDetail;
    return (
      <div>
        <ParticipantDetail participantDetail={participantDetail} />
      </div>
    );
  }
}

// export default graphql(queries.GET_ALL_CONFERENCE_ATTENDEES, {})(
//   AttendeeDetail,
// );
export default Index;
