import React from 'react';
import './style.css';
import { List, ListItem } from 'material-ui';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import NotificationWC from 'material-ui/svg-icons/notification/wc';

export default class GeneralInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="profile-usertitle-name"> Le Quoc Manh </div>
        <div className="profile-usertitle-job"> Developer </div>
        <div className="profile-user-menu">
          <List>
            <ListItem className="list-item" leftIcon={<ActionInfoOutline />}>
              <a href="">
                <i className="fa fa-facebook-square fa-lg" aria-hidden="true" />
              </a>
              <a>
                <i className="fa fa-twitter-square fa-lg" aria-hidden="true" />
              </a>
              <a>
                <i className="fa fa-linkedin-square fa-lg" aria-hidden="true" />
              </a>
            </ListItem>
            <ListItem
              className="list-item"
              primaryText="Male"
              leftIcon={<NotificationWC />}
            />
            <ListItem
              className="list-item"
              primaryText="13-03-1996"
              leftIcon={<SocialCake />}
            />
          </List>
        </div>
      </div>
    );
  }
}
