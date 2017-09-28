import React from 'react';
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import backgroundimage from '../../../../../../images/avatar-1606916_640.png';
import './style.scss';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  uploadButton: {
    verticalAlign: 'middle',
    width: '100%',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  raiseButton: {
    margin: 12,
  },
};
const CardExampleWithAvatar = () => (
  <Card style={styles.card} className="card">
    <CardMedia
      className="avatar-container"
      overlay={
        <FlatButton
          label="Change your avatar"
          labelPosition="before"
          style={styles.uploadButton}
          containerElement="label"
        >
          <input type="file" style={styles.uploadInput} />
        </FlatButton>
      }
    >
      <img src={backgroundimage} alt="avatar" className="image" />
    </CardMedia>
    <CardActions>
      <RaisedButton label="Save" primary={true} style={styles.raiseButton} />
      <RaisedButton
        label="Cancel"
        secondary={true}
        style={styles.raiseButton}
      />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;
