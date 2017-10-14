import React from 'react';
import { RaisedButton, IconButton, Dialog } from 'material-ui';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { NavigationClose } from 'material-ui/svg-icons';
import validate, { renderTextField, renderSchedules } from './validate';

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
        <RaisedButton label="Add Activity" onClick={this.handleOpen} />
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
            <FieldArray
              name="schedules"
              component={renderSchedules}
              rooms={rooms}
            />
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
