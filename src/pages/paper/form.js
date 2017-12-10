import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import { RaisedButton, Subheader, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
class EditPaperForm extends Component {
  render() {
    const topics = this.props.topics;
    const { handleSubmit } = this.props;
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
            hintText="Paper Abstract"
          />
        </div>
        <div className="d-flex form-group">
          <label>Keywords :</label>
          <Field
            name="keywords"
            component={CustomInput}
            fullWidth={true}
            multiLine
            rows={1}
            hintText="Paper Abstract"
          />
        </div>
        <div className="d-flex form-group">
          <label>Topic :</label>
          <Field
            name="topic"
            component={renderSelectField}
            hintText="Paper Topic"
            fullWidth={true}
          >
            {topics.map(topic => {
              return (
                <MenuItem
                  key={topic.id}
                  value={topic.id}
                  primaryText={topic.name}
                  // onClick={() => {
                  //   this.handleClick(topic);
                  // }}
                />
              );
            })}
          </Field>
        </div>
        <div
          style={{ marginBottom: '20px' }}
          className="d-flex save-btn btn-group"
        >
          <RaisedButton label="Save" primary={true} type="submit" />
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
