import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import backgroundimage from '../../../../../../images/conference.png';
import './style.scss';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};
const CardExampleWithAvatar = () => (
  <Card style={styles.card}>
    <CardMedia
      className="avatar-container"
      overlay={
        <div className="overlay">
          <div className="text">Hello World</div>
        </div>
      }
    >
      <img src={backgroundimage} alt="avatar" className="image" />
    </CardMedia>
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
