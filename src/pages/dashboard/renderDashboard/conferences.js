import React from 'react';
import { queries } from './../helpers';
import { graphql, compose, gql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import style from './../style.css';
import { RaisedButton } from 'material-ui';

const subTitleString = (text, limit) => {
  if (text.length > limit) return text.substring(0, limit);
  return text;
};
class listCoferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openToggle: false,
      openDialog: false,
      selectElement: 0,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  async handleSwitch(conference_id) {
    await this.props.SWITCH_CURRENT_CONFERENCE({
      variables: {
        conference_id: conference_id,
      },
      refetchQueries: [
        {
          query: ME_QUERY,
        },
      ],
    });
  }

  render() {
    const { loading, getAllConferencesByUserID } = this.props.data;
    if (loading) return <div>loading...</div>;

    const conferences = getAllConferencesByUserID;
    return (
      <div className="list-dashboard">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <center className="list-conf">
          MY LIST CONFERENCES
          <Badge
            badgeContent={conferences.length}
            primary={true}
            className="icon-conference"
          />
        </center>
        <List>
          {conferences.map(data => {
            const conference = data.conference;
            return (
              <ListItem
                key={conference.id}
                primaryText={conference.title}
                className="listitem-conf"
                secondaryText={
                  subTitleString(conference.start_date, 10) +
                  '  To  ' +
                  subTitleString(conference.end_date, 10)
                }
                containerElement={<Link to={`/conference/info`} />}
                onClick={async () => {
                  // clg;
                  await this.handleSwitch(conference.id);
                  window.location.reload();
                }}
              />
            );
          })}
          <RaisedButton
            label="Create new conference"
            fullWidth={true}
            primary={true}
            containerElement={<Link to={`/conference/add`} />}
          />
        </List>
      </div>
    );
  }
}

export const SWITCH_CURRENT_CONFERENCE = gql`
  mutation switchCurrentConference($conference_id: ID!) {
    switchCurrentConference(conference_id: $conference_id) {
      id
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      currentConference {
        id
      }
    }
  }
`;

export default compose(
  graphql(queries.GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.user_id,
      },
    }),
  }),
  graphql(SWITCH_CURRENT_CONFERENCE, {
    name: 'SWITCH_CURRENT_CONFERENCE',
  }),
  graphql(ME_QUERY, {
    name: 'ME_QUERY',
  }),
)(listCoferences);
