import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, MenuItem, Subheader } from 'material-ui';
import { renderSchedules, renderSelectField } from '../../render';
import { Link } from 'react-router-dom';
// import validate from '../../validate';
class EditActivityPaper extends Component {
  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    let papers, rooms, topics;
    if (this.props) {
      papers = this.props.papers;
      rooms = this.props.rooms;
      topics = this.props.topics;
    }
    return (
      <form className="form conference-info " onSubmit={handleSubmit}>
        <Subheader className="subheader">Edit Activity Information</Subheader>

        {error && <div className="error">{error}</div>}
        <div className="d-flex form-group">
          <label>Topic :</label>
          <Field
            name="topic"
            component={renderSelectField}
            hintText="Activity Topic"
            fullWidth={true}
          >
            {topics.map(topic => {
              return (
                <MenuItem
                  key={topic.id}
                  value={topic.id}
                  primaryText={topic.name}
                />
              );
            })}
          </Field>
        </div>
        <div className="d-flex form-group">
          <label>Paper :</label>
          <Field
            name="paper"
            component={renderSelectField}
            hintText="Activity Paper"
            fullWidth={true}
          >
            {papers.map(paper => {
              return (
                <MenuItem
                  key={paper.id}
                  value={paper.id}
                  primaryText={paper.title}
                />
              );
            })}
          </Field>
        </div>

        <div className="d-flex form-group">
          <FieldArray
            name="schedules"
            component={renderSchedules}
            rooms={rooms}
          />
        </div>
        <div className="d-flex form-group">
          <Field name="error" component="label" />
        </div>
        <div className="d-flex justify-content-flex-end">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />
          <RaisedButton
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </form>
    );
  }
}
EditActivityPaper = reduxForm({
  form: 'editActivityPaper',
  // validate,
})(EditActivityPaper);
export default EditActivityPaper;
