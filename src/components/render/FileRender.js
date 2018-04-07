import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e);
  }

  render() {
    return (
      <input accept="application/pdf" type="file" onChange={this.onChange} />
    );
  }
}

export default FileInput;
