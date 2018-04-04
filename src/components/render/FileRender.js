import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    // onChange(e.target.files[0]);
    onChange(e);
  }

  render() {
    console.log('file input', this.props);
    const { input: { value } } = this.props;

    return (
      <input
        type="file"
        // value={value ? value[0].name : 'notfound'}
        onChange={this.onChange}
      />
    );
  }
}

export default FileInput;
