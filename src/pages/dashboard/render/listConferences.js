import React from 'react';
import { queries } from './../helpers';
import { graphql, compose } from 'react-apollo';
import ConferenceCard from './conferenceCard';

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
      <div name="conferences">
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        {conferences.map(conference => {
          return <ConferenceCard conference={conference} key={conference.id} />;
        })}
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.user_id,
      },
    }),
  }),
)(GetAllConfs);
