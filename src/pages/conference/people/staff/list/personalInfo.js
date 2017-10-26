import React from 'react';
import { TextField, ListItem } from 'material-ui';
import {
  NotificationWc,
  ActionPermIdentity,
  SocialCake,
  CommunicationMailOutline,
  ActionWork,
} from 'material-ui/svg-icons';
const PersonalInfo = () => {
  return (
    <div
      className="form conference-info view-form"
      style={{ paddingTop: '30px' }}
    >
      <div className="d-flex form-group">
        <ListItem
          className="title-group"
          primaryText="Name:"
          leftIcon={<ActionPermIdentity />}
          disabled={true}
        />
        <TextField
          underlineShow={false}
          hintText="Le Quoc Manh"
          disabled={true}
        />
      </div>
      <div className="d-flex form-group">
        <ListItem
          className="title-group"
          primaryText="Position:"
          leftIcon={<ActionWork />}
          disabled={true}
        />
        <TextField underlineShow={false} hintText="Moderator" disabled={true} />
      </div>
      <div className="d-flex form-group">
        <ListItem
          className="title-group"
          primaryText="Email:"
          leftIcon={<CommunicationMailOutline />}
          disabled={true}
        />
        <TextField
          underlineShow={false}
          hintText="lequocmanh2010@gmail.com"
          disabled={true}
        />
      </div>
      <div className="d-flex form-group">
        <ListItem
          className="title-group"
          primaryText="Date of birth:"
          leftIcon={<SocialCake />}
          disabled={true}
        />
        <TextField
          underlineShow={false}
          hintText="10-20-1996"
          disabled={true}
        />
      </div>
      <div className="d-flex form-group">
        <ListItem
          className="title-group"
          primaryText="Gender:"
          leftIcon={<NotificationWc />}
          disabled={true}
        />
        <TextField underlineShow={false} hintText="Male" disabled={true} />
      </div>
    </div>
  );
};

export default PersonalInfo;
