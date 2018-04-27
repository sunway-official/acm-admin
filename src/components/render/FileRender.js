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
    const { meta: { touched, error, warning } } = this.props;
    return (
      <div>
        <input
          accept="application/pdf"
          type="file"
          onChange={this.onChange}
          name={this.props.name}
        />
        <div className="error-txt">
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  }
}

export default FileInput;
