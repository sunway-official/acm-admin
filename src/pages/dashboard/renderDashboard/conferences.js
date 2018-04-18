import React from 'react';
import { queries } from './../helpers';
import { graphql, compose, gql } from 'react-apollo';
import {
  Card,
  ListItem,
  RaisedButton,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui';
import Loading from 'components/render/renderLoading';
import { withRouter, Link } from 'react-router-dom';

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
    const linkTo = '/conference/info';
    this.props.history.push(linkTo);
  }

  render() {
    const { loading, getAllConferencesByUserID } = this.props.data;
    if (loading) return <Loading />;
    const conferences = getAllConferencesByUserID;
    return (
      <div className="list-dashboard">
        {conferences.map(data => {
          const conference = data.conference;
          return (
            <Card className="card-item" key={conference.id}>
              <CardHeader
                className="card-header"
                title={conference.category_name}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions />
              <CardText expandable={true}>
                <ListItem
                  primaryText={conference.title}
                  className="listitem-conf"
                  secondaryText={
                    subTitleString(conference.start_date, 10) +
                    '  To  ' +
                    subTitleString(conference.end_date, 10)
                  }
                  onClick={() => this.handleSwitch(conference.id)}
                />
              </CardText>
            </Card>
          );
        })}
        <RaisedButton
          className="btn"
          label="Create new conference"
          fullWidth={true}
          primary={true}
          containerElement={<Link to={`/conference/add`} />}
        />
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
  withRouter,
  graphql(queries.GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {}),
  graphql(SWITCH_CURRENT_CONFERENCE, {
    name: 'SWITCH_CURRENT_CONFERENCE',
  }),
  graphql(ME_QUERY, {
    name: 'ME_QUERY',
  }),
)(listCoferences);
