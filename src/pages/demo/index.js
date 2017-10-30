import React, { Component } from 'react';
import style from './style.css';
import S3Image from 'components/S3Image';
import { S3 } from 'providers';
import RaisedButton from 'material-ui/RaisedButton';
import { toBase64Async } from 'transformers/file';

class DemoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageKey: 'girl.jpg',
    };

    this._renderDemoGetAsync = this._renderDemoGetAsync.bind(this);
    this._renderDemoPutAsync = this._renderDemoPutAsync.bind(this);
    this._onPickedImage = this._onPickedImage.bind(this);
  }

  _renderDemoGetAsync() {
    return (
      <div className="block">
        <div>Demo getAsync</div>
        <S3Image Key={this.state.imageKey} />
      </div>
    );
  }

  _renderDemoPutAsync() {
    return (
      <div className="block">
        <div>Demo putAsync</div>
        <RaisedButton
          containerElement="label" // To trigger input[type=file] on press
          label="Select an image to upload"
          primary={true}
        >
          <input type="file" onChange={this._onPickedImage} />
        </RaisedButton>
      </div>
    );
  }

  /**
   * It is a bad practice to upload file directly like this
   * this handler should be call on form SUBMIT
   * @param event: event object from input onChange event
   */
  async _onPickedImage({ target: { files } }) {
    const file = files[0];
    // Convert file to base64
    const base64 = await toBase64Async(file);
    const name = file.name;
    // Then upload to S3
    const { Key } = await S3.putAsync({ name, base64 });
    this.setState({ imageKey: Key });
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="demo">
          {this._renderDemoGetAsync()}
          {this._renderDemoPutAsync()}
        </div>
      </div>
    );
  }
}

export default DemoPage;
