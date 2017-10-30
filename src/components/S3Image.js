import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { S3 } from 'providers';

/**
 * S3Image Component
 * Inherit all props from Image
 * Props:
 *  - Key: "Key from S3"
 */
class S3Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri: null,
    };

    this._setImage = this._setImage.bind(this);
  }

  async _setImage(Key) {
    const imageUri = await S3.getAsync({ Key: Key });
    this.setState({ imageUri });
  }

  componentDidMount() {
    const { Key } = this.props;
    this._setImage(Key);
  }

  componentWillReceiveProps(nextProps) {
    const { Key } = nextProps;
    if (Key !== this.props.Key) {
      this._setImage(Key);
    }
  }

  render() {
    const { Key, alt, ...others } = this.props;
    return <img src={this.state.imageUri} alt={alt} {...others} />;
  }
}

S3Image.propTypes = {
  Key: PropTypes.string,
};

export default S3Image;
