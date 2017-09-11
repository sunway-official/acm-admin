import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import style from './style.css';

const NotificationsIcon = props => (
  <SvgIcon {...props}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
  </SvgIcon>
);
const MailIcon = props => (
  <SvgIcon {...props}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
  </SvgIcon>
);

const CalendarIcon = props => (
  <SvgIcon {...props}>
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </SvgIcon>
);
const BadgeExampleSimple = () => (
  <div className="menu">
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <Badge
      className="badge"
      badgeContent={10}
      primary={true}
      badgeStyle={{ top: 0, left: 30 }}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
    <Badge
      className="badge"
      badgeContent={5}
      primary={true}
      badgeStyle={{ top: 0, left: 30 }}
    >
      <IconButton tooltip="Mails">
        <MailIcon />
      </IconButton>
    </Badge>
    <Badge
      className="badge"
      badgeContent={4}
      primary={true}
      badgeStyle={{ top: 0, left: 30 }}
    >
      <IconButton tooltip="Calendar">
        <CalendarIcon />
      </IconButton>
    </Badge>
  </div>
);

export default BadgeExampleSimple;
