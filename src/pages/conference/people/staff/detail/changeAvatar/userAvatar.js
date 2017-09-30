import React from 'react';
import { images } from '../../../../../../theme';
import './style.css';

const UserAvatar = () => (
  <div className="img">
    <img src={images.defaultAvatar} alt="avatar" id="avatar" />
  </div>
);

export default UserAvatar;
