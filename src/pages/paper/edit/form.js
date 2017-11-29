import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../validate';
import { RaisedButton, Checkbox, Subheader, Divider } from 'material-ui';
class EditPaperForm extends Component {
  render() {
    const renderCheckbox = ({ input, label }) => (
      <Checkbox
        label={label}
        // checked={input.value ? true : false}
        onCheck={input.onChange}
      />
    );
    const { handleSubmit, invalid } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <Subheader className="subheader">Paper Information</Subheader>
        <div className="d-flex form-group">
          <label>Title :</label>
          <Field
            name="title"
            component={CustomInput}
            fullWidth={true}
            hintText={'Paper Title'}
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
        <Subheader style={{ fontSize: '25px' }}>Topic</Subheader>
        <Divider />
        <div className="d-flex flex-wrap" style={{ marginTop: '20px' }}>
          {/* {topics.map(topic => {
            return (
              <div key={topic.id} style={{ width: '50%' }}>
                <Field
                  name={`topics[${topic.id}]`}
                  component={renderCheckbox}
                  label={topic.name}
                />
              </div>
            );
          })}
          */}
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
  form: 'EditPaperForm',
  validate,
})(EditPaperForm);
