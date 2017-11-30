import React, { Component } from 'react';
import CustomInput from 'components/CustomInput';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../validate';
import { RaisedButton, Subheader, Divider } from 'material-ui';

class EditPaperForm extends Component {
  render() {
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
            id="text-field-default"
            name="abstract"
            type="text"
            component={CustomInput}
            fullWidth={true}
            multiLine
            rows={1}
            hintText="Paper abc"
          />
        </div>
        <Subheader style={{ fontSize: '20px' }}>Topic</Subheader>
        <Divider />
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
const mapStateToProps = (state, ownProps) => {
  const paper = ownProps.paper;
  console.log(paper);
  return {
    initialValues: {
      id: paper.id,
      title: paper.title,
      abstract: paper.abstract,
    },
  };
};

EditPaperForm = connect(mapStateToProps, undefined)(EditPaperForm);
export default (EditPaperForm = reduxForm({
  form: 'EditPaperForm',
  validate,
})(EditPaperForm));
