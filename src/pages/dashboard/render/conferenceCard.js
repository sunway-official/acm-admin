import React from 'react';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import style from './../style.css';
import { mutations, queries } from '../helpers';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ActionGrade } from 'material-ui/svg-icons';

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
        <Card className="card-content">
          <div className="conf-title">{conference.title}</div>
          <div className="conf-des">
            <i>{conference.description}</i>
          </div>
          <div className="conf-date">
            <div className="start-date">
              <ActionGrade />
              <i>{conference.start_date}</i>
            </div>
            <div className="end-date">
              <ActionGrade />
              <i>{conference.end_date}</i>
            </div>
          </div>
          <FlatButton
            className="switch-button"
            label="Switch"
            onClick={async () => {
              await this.handleSwitch(conference.id);
              await this.props.history.replace('/conference/info');
              window.location.reload();
            }}
          />
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
