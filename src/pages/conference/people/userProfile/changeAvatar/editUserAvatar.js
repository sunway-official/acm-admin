import React from 'react';
import { gql, graphql } from 'react-apollo';
import { IconButton } from 'material-ui';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import { toBase64Async } from 'lib/fileTransformer';
import S3 from 'lib/s3';
import './style.css';
import { images } from '../../../../../theme';

const S3_GET_PREFIX = process.env.REACT_APP_S3_GET_PREFIX;

class EditUserAvatar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  async handleChangeImage({ target: { files } }) {
    const firstImage = files[0];
    const imageName = firstImage.name;
    const hashedImage = await toBase64Async(firstImage);
    const { Key } = await S3.putAsync({ name: imageName, base64: hashedImage });
    await this.props.updateAvatar({
      variables: {
        avatarUrl: Key,
      },
    });
  }
  render() {
    return (
      <div className="img">
        <div className="img_overlay">
          <IconButton
            tooltip="Choose your avatar"
            className="avatarButton"
            onClick={event => {
              event.preventDefault();
              this.fileInput.click();
            }}
          >
            <ActionCameraEnhance className="avatarIcon" />
          </IconButton>
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/x-png,image/gif,image/jpeg"
            ref={ref => {
              this.fileInput = ref;
            }}
            onChange={this.handleChangeImage}
          />
        </div>
        <img
          src={
            this.props.avatar
              ? S3_GET_PREFIX + this.props.avatar
              : images.defaultAvatar
          }
          alt="avatar"
          id="avatar"
        />
      </div>
    );
  }
}

// const EditUserAvatar = () => (
//   <div className="img avatar">
//     <div className="img_overlay">
//       <IconButton tooltip="Choose your avatar" className="avatarButton">
//         <ActionCameraEnhance className="avatarIcon" />
//       </IconButton>
//     </div>
//     <img src={images.defaultAvatar} alt="avatar" id="avatar" />
//   </div>
// );
const UPDATE_AVATAR_MUTATION = gql`
  mutation UpdateAvatarMutation($avatarUrl: String!) {
    updateAvatar(avatarUrl: $avatarUrl) {
      id
    }
  }
`;

export default graphql(UPDATE_AVATAR_MUTATION, {
  name: 'updateAvatar',
})(EditUserAvatar);
