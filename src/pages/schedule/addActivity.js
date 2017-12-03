import React from 'react';
import {
  RaisedButton,
  IconButton,
  Dialog,
  FloatingActionButton,
  MenuItem,
  Menu,
  Popover,
} from 'material-ui';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { NavigationClose, ContentAdd } from 'material-ui/svg-icons';
import validate from './validate';
import { renderSchedules, renderSelectField, renderTextField } from './render';
import { connect } from 'react-redux';
import { scheduleActions, scheduleOperations } from 'store/ducks/schedule';
import { Link } from 'react-router-dom';
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
    dialogTitle: 'Add New Activity',
    openAdd: false,
  };
  handleTouchTap = event => {
    event.preventDefault();
    this.setState({
      openAdd: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      openAdd: false,
    });
  };

  render() {
    // const render = ({}) =>(
    //   <div></div>
    // )
    const { handleSubmit, submitting, pristine, rooms, error } = this.props;
    let papers;
    if (this.props) {
      papers = this.props.papers;
    } else return <div>Loading</div>;
    return (
      <div>
        <FloatingActionButton
          style={style}
          className="position-fixed"
          onClick={this.handleTouchTap}
          mini={true}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Popover
          open={this.state.openAdd}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <Link to="/conference/activities/addActivityPaper">
              <MenuItem primaryText="Add activity with paper" />
            </Link>
            <MenuItem
              primaryText="Add activity with title"
              onClick={this.props.toggleAddActivityTitle}
            />
          </Menu>
        </Popover>
        <Dialog
          title={this.state.dialogTitle}
          modal={true}
          autoScrollBodyContent={true}
          open={this.props.openAddFormModalWithPaper}
        >
          <form className="form conference-info" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
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
              <IconButton
                tooltip="Close"
                className="cancel-btn dialog"
                onClick={() => {
                  this.props.toggleAddActivityPaper();
                  this.props.reset();
                }}
              >
                <NavigationClose />
              </IconButton>
            </div>
          </form>
        </Dialog>
        <Dialog
          title={this.state.dialogTitle}
          modal={true}
          autoScrollBodyContent={true}
          open={this.props.openAddFormModalWithTitle}
        >
          <form className="form conference-info" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="d-flex form-group">
              <label>Title :</label>
              <Field
                name="title"
                component={renderTextField}
                hintText="Activity Title"
                fullWidth={true}
              />
            </div>
            <div className="d-flex form-group">
              <label>Description :</label>
              <Field
                name="description"
                component={renderTextField}
                hintText="Activity Description"
                fullWidth={true}
                multiLine
                rows={1}
              />
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
              <IconButton
                tooltip="Close"
                className="cancel-btn dialog"
                onClick={() => {
                  this.props.toggleAddActivityTitle();
                  this.props.reset();
                }}
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

const mapStateToProps = state => {
  return {
    openAddFormModalWithPaper: state.schedule.openAddFormModalWithPaper,
    openAddFormModalWithTitle: state.schedule.openAddFormModalWithTitle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAddActivityPaper: () =>
      dispatch(scheduleActions.toggleAddActivityPaperFormModal()),
    toggleAddActivityTitle: () =>
      dispatch(scheduleActions.toggleAddActivityTitleFormModal()),
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDialog);
