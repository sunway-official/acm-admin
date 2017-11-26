import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import { RaisedButton } from 'material-ui';
class AddPaperForm extends Component {
  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div className="d-flex form-group">
          <label>Title :</label>
          <Field
            name="title"
            component={CustomInput}
            fullWidth={true}
            hintText="Paper Title"
          />
        </div>
        <div className="d-flex form-group">
          <label>Abstract :</label>
          <Field
            name="abstract"
            component={CustomInput}
            fullWidth={true}
            multiLine
            rows={1}
            hintText="Paper Abstract"
          />
        </div>
        <div className="d-flex save-btn btn-group">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            onClick={() => {
              if (!invalid) {
                alert('Saved');
              }
            }}
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddPaperForm',
  validate,
})(AddPaperForm);
