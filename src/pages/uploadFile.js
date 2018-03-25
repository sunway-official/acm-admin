import React, { Component } from 'react';
import { toBase64Async } from 'lib/fileTransformer';
import S3 from 'lib/s3';
import { gql, graphql } from 'react-apollo';

const style = {
  marginTop: '150px',
};

const S3_GET_PREFIX = process.env.REACT_APP_S3_GET_PREFIX;

class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.state = {
      url: '',
    };
  }

  async handleUploadFile({ target: { files } }) {
    const file = files[0];
    const fileName = file.name;
    // const hashedFile = await toBase64Async(file, 'pdf');
    const { Key } = await S3.putAsync({
      name: fileName,
      bodyFile: file,
      isImage: false,
    });
    const paper = await this.props.updatePaper({
      variables: {
        id: 1,
        file: Key,
      },
    });
    this.setState({
      url: S3_GET_PREFIX + Key,
    });
  }

  render() {
    return (
      <div style={style}>
        <input
          type="file"
          accept="application/pdf"
          ref={ref => {
            this.fileInput = ref;
          }}
          onChange={this.handleUploadFile}
        />
        {this.state.url && (
          <a href={this.state.url} target="_blank">
            Download
          </a>
        )}
      </div>
    );
  }
}

const UPDATE_PAPER = gql`
  mutation updatePaper($id: ID!, $file: String) {
    updatePaper(id: $id, file: $file) {
      id
      file
    }
  }
`;

export default graphql(UPDATE_PAPER, {
  name: 'updatePaper',
})(UploadFile);
