import React from 'react';
import './style.css';
import { List, ListItem } from 'material-ui/List';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import SocialCake from 'material-ui/svg-icons/social/cake';
import { images } from '../../../../../theme';
import Avatar from 'material-ui/Avatar';

export default class GeneralInfo extends React.Component {
  render() {
    return (
      <div className="left-div">
        <div className="card" id="left-form-container">
          <div className="card-content">
            <Avatar id="avatar" src={images.defaultAvatar} size={140} />
            <div className="profile-usertitle-name"> Le Quoc Manh </div>
            <div className="profile-usertitle-job"> Developer </div>
            <div className="profile-user-menu">
              <List>
                <ListItem
                  className="list-item"
                  primaryText="Inbox"
                  leftIcon={<CommunicationMessage />}
                />
                <ListItem
                  className="list-item"
                  primaryText="Setting"
                  leftIcon={<ActionSettings />}
                />
                <ListItem
                  className="list-item"
                  primaryText="13-03-1996"
                  leftIcon={<SocialCake />}
                />
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
