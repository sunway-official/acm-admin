import React from 'react';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import style from './../style.css';
import { mutations, queries } from '../helpers';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ActionSchedule } from 'material-ui/svg-icons';
import ContentSend from 'material-ui/svg-icons/content/send';

const subTitleString = (text, limit) => {
  if (text.length > limit) return text.substring(0, limit);
  return text;
};
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
          <div className="conf-title">
            {conference.title}
            <br />
            <div className="conf-date">
              <ActionSchedule className="conf-date-icon" />
              <div className="start-date">
                <i>{subTitleString(conference.start_date, 10)}</i>
              </div>
              <div className="end-date">
                <i>{subTitleString(conference.end_date, 10)}</i>
              </div>
            </div>
          </div>

          <div className="conf-des">
            <i>{conference.description}</i>
          </div>
          <div className="consf-switch">
            {/* <hr /> */}
            <FlatButton
              className="switch-button"
              label="Switch"
              onClick={async () => {
                await this.handleSwitch(conference.id);
                await this.props.history.replace('/conference/info');
                window.location.reload();
              }}
            />
            {/* <ContentSend className="btn" /> */}
          </div>
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
