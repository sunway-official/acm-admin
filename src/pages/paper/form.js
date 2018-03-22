import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import { RaisedButton, Subheader, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import renderCheckbox from 'components/renderCheckbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddAuthors from './add/addAuthors';
import { FieldArray } from 'redux-form';

class EditPaperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  updateCheck() {
    this.setState(oldState => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {
    const topics = this.props.topics;
    const { handleSubmit, pristine } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        {/* corresponser */}
        <div className="paper-submit-block">
          <Subheader className="subheader submit-header">
            Address For Corresponser
          </Subheader>
          <div className="d-flex form-group">
            <label>Street :</label>
            <Field
              name="street"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the street"
            />
          </div>
          <div className="d-flex form-group">
            <label>City :</label>
            <Field
              name="city"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the city"
            />
          </div>
          <div className="d-flex form-group">
            <label>Country :</label>
            <Field
              name="country"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the country"
            />
          </div>
        </div>
        {/* corresponser */}

        {/* authors */}
        {/* <div className="paper-submit-block">
          <Subheader className="subheader submit-header">Authors</Subheader>
          <div className="d-flex form-group">
            <label>First name :</label>
            <Field
              name="firstname"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the first name"
            />
          </div>
          <div className="d-flex form-group">
            <label>Last name :</label>
            <Field
              name="lastname"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the last name"
            />
          </div>
          <div className="d-flex form-group">
            <label>Title :</label>
            <Field name="status" component={renderSelectField} fullWidth={true}>
              <MenuItem value="mr" primaryText="Mr" />
              <MenuItem value="ms" primaryText="Ms" />
            </Field>
          </div>
          <div className="d-flex form-group">
            <label>Email:</label>
            <Field
              name="email"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the email"
            />
          </div>
          <div className="d-flex form-group">
            <label>Organization:</label>
            <Field
              name="organization"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the organization"
            />
          </div>
          <div className="d-flex form-group">
            <label>Street :</label>
            <Field
              name="authorstreet"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the street"
            />
          </div>
          <div className="d-flex form-group">
            <label>City :</label>
            <Field
              name="authorCity"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the city"
            />
          </div>
          <div className="d-flex form-group">
            <label>Country :</label>
            <Field
              name="authorCountry"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the country"
            />
          </div>

          <div className="form-group">
            <div className="f-right pb-6">
              <Field
                label="Corresponding"
                name="corresponding"
                value={false}
                component={renderCheckbox}
                type="checkbox"
              />
            </div>
          </div>
        </div> */}
        {/* authors */}

        {/* aa */}
        <FieldArray name="addAuthors" component={AddAuthors} />
        {/*  */}
        {/* paper */}
        <div className="paper-submit-block mt-50">
          <Subheader className="subheader submit-header">
            Paper Information
          </Subheader>
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
                  />
                );
              })}
            </Field>
          </div>
          <div className="d-flex form-group">
            <label>File :</label>
            <Field
              name="keywords"
              component={CustomInput}
              fullWidth={true}
              multiLine
              rows={1}
              hintText="Drop the file"
            />
          </div>
        </div>
        {/* paper */}

        <div
          style={{ marginBottom: '20px' }}
          className="d-flex save-btn btn-group"
        >
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine}
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
