import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Menu, MenuItem, Popover } from 'material-ui';
import { sidebarActions } from 'store/ducks/sidebar';

import {
  ActionInfoOutline,
  ActionSupervisorAccount,
  // ActionChromeReaderMode,
  AvLibraryBooks,
  // EditorShowChart,
  NotificationEventAvailable,
  HardwareKeyboardArrowRight,
  SocialLocationCity,
  EditorFormatListNumbered,
  AvWeb,
} from 'material-ui/svg-icons';

export const ConferenceInfo = () => (
  <Link to="/conference/info">
    <ListItem
      className="item"
      primaryText={'Information'}
      leftIcon={<ActionInfoOutline />}
      onClick={() => this.handleClickSidebar()}
    />
  </Link>
);

export default {
  ConferenceInfo,
};
