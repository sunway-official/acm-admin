import React from 'react';
import { IconButton } from 'material-ui';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import { images } from '../../../../../theme';
import './style.css';

const EditUserAvatar = () => (
  <div className="img">
    <div className="img_overlay">
      <IconButton tooltip="Choose your avatar" className="avatarButton">
        <ActionCameraEnhance className="avatarIcon" />
      </IconButton>
    </div>
    <img src={images.defaultAvatar} alt="avatar" id="avatar" />
  </div>
);

export default EditUserAvatar;
