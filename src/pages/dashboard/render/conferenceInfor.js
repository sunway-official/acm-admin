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
import { Link } from 'react-router-dom';
import style from './../style.css';

class ConferenceCard extends React.Component {
  render() {
    const conference = this.props.conference;
    console.log(this.props.conference);
    return (
      <div className="conference-card">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Card>
          <CardHeader title="" />
          <CardMedia overlay={<CardTitle title={conference.title} />} />
          <CardText>{conference.description}</CardText>
          <CardActions>
            <Link to={`/conference/${conference.id}/info`}>
              <FlatButton className="switch-button" label="Switch" />
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default ConferenceCard;
