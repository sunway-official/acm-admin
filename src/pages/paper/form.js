import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import { RaisedButton, Subheader, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import AddAuthors from './add/addAuthors';
import { FieldArray } from 'redux-form';
// import renderUploadFile from 'components/render/renderUploadFile';
import FileInput from 'components/render/FileRender';

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
    const { handleSubmit, pristine, handleUploadFile } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
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
              name="file"
              component={FileInput}
              // fullWidth={true}
              onChange={handleUploadFile}
              // multiLine
              // rows={1}
              // hintText="Drop the file"
              // ref={el => (this.file = el)}
            />
          </div>
        </div>
        {/* paper */}
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
          <div className="d-flex form-group">
            <label>Zipcode :</label>
            <Field
              name="zipcode"
              component={CustomInput}
              fullWidth={true}
              hintText="Enter the zipcode"
            />
          </div>
        </div>
        {/* corresponser */}

        {/* author */}
        <FieldArray name="addAuthors" component={AddAuthors} />
        {/* author */}

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
