import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import style from './../style.css';
import { mutations, queries } from '../helpers';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class ConferenceCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  async handleSwitch(conference_id) {
    await this.props.SWITCH_CURRENT_CONFERENCE({
      variables: {
        conference_id: conference_id,
      },
      refetchQueries: [
        {
          query: queries.ME_QUERY,
        },
      ],
    });
  }

  render() {
    const conference = this.props.conference;
    return (
      <div className="conference-card">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Card>
          <CardHeader title="" />
          <CardMedia overlay={<CardTitle title={conference.title} />} />
          <CardText>{conference.description}</CardText>
          <CardActions>
            <FlatButton
              className="switch-button"
              label="Switch"
              onClick={async () => {
                await this.handleSwitch(conference.id);
                await this.props.history.replace('/conference/info');
                window.location.reload();
              }}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const withRouterConferenceCard = withRouter(ConferenceCard);

export default compose(
  graphql(mutations.SWITCH_CURRENT_CONFERENCE, {
    name: 'SWITCH_CURRENT_CONFERENCE',
  }),
)(withRouterConferenceCard);

// <Link to={`/conference/info`}>

// </Link>
