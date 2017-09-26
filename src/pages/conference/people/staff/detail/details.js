import React, { Component } from 'react';
import './style.css';
import Avatar from 'material-ui/Avatar';
import TabsExampleSwipeable from './tab';
import { List, ListItem } from 'material-ui/List';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import SocialCake from 'material-ui/svg-icons/social/cake';
import { images } from '../../../../../theme';

export default class UserProfile extends Component {
  render() {
    return (
      <div className="contain">
        <div className="form-container">
          <div className="left-div">
            <div className="card" id="left-form-container">
              <div className="card-content">
                <Avatar id="avatar" src={images.defaultAvatar} size={140} />
                <div className="profile-usertitle-name"> Thanh Vinh Lu </div>
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
          <div className="right-div">
            <div className="card" id="right-form-container">
              <div className="card-content">
                <TabsExampleSwipeable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
