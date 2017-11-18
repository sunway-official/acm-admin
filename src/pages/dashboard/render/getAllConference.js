import React from 'react';
import { GET_ALL_CONFERENCES_BY_USER_ID_QUERY } from './../helpers/mutation';
import { graphql, compose } from 'react-apollo';
import ConferenceCard from './conferenceInfor';

// import style from '../../../containers/layout/appbar/style.css';
import { style } from './../style.css';

class GetAllConfs extends React.Component {
  render() {
    console.log(this.props);
    const { loading } = this.props.data;
    if (loading) return <div>loading...</div>;

    const conferences = this.props.data.getConferenceByUserID;
    console.log(conferences);
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        <div name="conferences">
          {conferences.map(conference => {
            return (
              <div key={conference.id}>
                <ConferenceCard conference={conference} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.id,
      },
    }),
  }),
)(GetAllConfs);
