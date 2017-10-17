import React from 'react';
import {
  RaisedButton,
  IconButton,
  Dialog,
  FloatingActionButton,
} from 'material-ui';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { NavigationClose, ContentAdd } from 'material-ui/svg-icons';
import validate, { renderTextField } from './validate';
import renderSchedules from './renderSchedules';

const style = {
  marginTop: '20px',
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
};
class AddDialog extends React.PureComponent {
  state = {
    openAdd: false,
    dialogTitle: '',
  };

  handleOpen = isAdd => {
    if (isAdd) {
      this.setState({ openAdd: true, dialogTitle: 'Add New Activity' });
    }
  };

  handleClose = () => {
    this.setState({ openAdd: false });
  };

  render() {
    const { handleSubmit, submitting, pristine, invalid, rooms } = this.props;
    return (
      <div>
        <FloatingActionButton
          style={style}
          className="position-fixed"
          onClick={this.handleOpen}
          mini={true}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={this.state.dialogTitle}
          modal={true}
          autoScrollBodyContent={true}
          open={this.state.openAdd}
        >
          <form className="form conference-info" onSubmit={handleSubmit}>
            <div className="d-flex form-group">
              <label>Title :</label>
              <Field
                name="title"
                component={renderTextField}
                hintText="Activity Title"
              />
            </div>
            <div className="d-flex form-group">
              <label>Description :</label>
              <Field
                name="description"
                component={renderTextField}
                hintText="Activity Description"
              />
            </div>
            <div className="d-flex form-group">
              <FieldArray
                name="schedules"
                component={renderSchedules}
                rooms={rooms}
              />
            </div>

            <div className="d-flex justify-content-flex-end">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting || invalid}
                onClick={this.handleClose}
              />
              <IconButton
                tooltip="Close"
                className="cancel-btn dialog"
                onClick={this.handleClose}
              >
                <NavigationClose />
              </IconButton>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}
const afterSubmit = (result, dispatch) => dispatch(reset('addDialog'));
AddDialog = reduxForm({
  form: 'addDialog',
  onSubmitSuccess: afterSubmit,
  validate,
})(AddDialog);

export default AddDialog;
