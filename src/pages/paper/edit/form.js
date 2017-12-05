import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { reduxForm, Field } from 'redux-form';
import validate from '../validate';
import { RaisedButton, Subheader, Checkbox } from 'material-ui';
import { Link } from 'react-router-dom';

class EditPaperForm extends Component {
  render() {
    const { handleSubmit, invalid } = this.props;
    const renderCheckbox = ({ input, label }) => (
      <Checkbox
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
      />
    );
    const allTopics = this.props.allTopics;
    let paperTopics;
    if (this.props) {
      paperTopics = this.props.paperTopics;
    }

    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <Subheader className="subheader">Paper Information</Subheader>
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
            hintText="Paper abc"
          />
        </div>
        <div className="d-flex form-group">
          <label>Keywords :</label>
          <Field
            name="keywords"
            component={CustomInput}
            fullWidth={true}
            hintText="Paper Keywords"
          />
        </div>
        <Subheader style={{ fontSize: '20px' }}>Topic</Subheader>
        <div className="d-flex flex-wrap" style={{ marginTop: '20px' }}>
          {allTopics.map(topic => {
            return (
              <div key={topic.id} style={{ width: '50%' }}>
                <Field
                  name={`topics[${topic.id}]`}
                  component={renderCheckbox}
                  label={topic.name}
                  checked={paperTopics.includes(topic.name) ? true : false}
                />
              </div>
            );
          })}
        </div>
        <div
          style={{ marginBottom: '20px' }}
          className="d-flex save-btn btn-group"
        >
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
          <RaisedButton
            label="Cancel"
            style={{ marginLeft: '10px' }}
            containerElement={<Link to="/conference/papers" />}
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
