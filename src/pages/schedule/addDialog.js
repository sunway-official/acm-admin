import React from 'react';
import Dialog from 'material-ui/Dialog';
import { RaisedButton, DatePicker, TimePicker } from 'material-ui';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY } from './index';

const validate = values => {
  const errors = {};
  const requiredFields = ['date', 'startTime', 'endTime'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
const minDate = new Date();

const getDateTime = (date, time) => {
  const getFullYear = date.getFullYear();
  const getMonth = date.getMonth();
  const getDate = date.getDate();

  const getHours = time.getHours();
  const getMinutes = time.getMinutes();

  const dateTime = new Date(
    Date.UTC(getFullYear, getMonth, getDate, getHours, getMinutes),
  );

  return dateTime;
};

const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={minDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);
const renderTimePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TimePicker
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

class AddDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleInsert() {
    const {
      INSERT_ACTIVITY_MUTATION,
      INSERT_SCHEDULE_MUTATION,
      newStarTime,
      newEndTime,
      conferenceId,
    } = this.props;

    const title = 'My new Title 5 to test function';

    INSERT_ACTIVITY_MUTATION({
      variables: {
        conference_id: conferenceId,
        title: title,
      },
    })
      .then(({ data }) => {
        INSERT_SCHEDULE_MUTATION({
          variables: {
            activity_id: data.insertActivity.id,
            room_id: 1,
            start: newStarTime,
            end: newEndTime,
          },
          refetchQueries: [
            {
              query: GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
              variables: { conference_id: conferenceId },
            },
          ],
        });
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });

    this.handleClose();
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;

    return (
      <div>
        <RaisedButton label="Add Activity" onClick={this.handleOpen} />

        <Dialog title="Dialog With Actions" modal={true} open={this.state.open}>
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex date">
              <div className="d-flex form-group">
                <Field
                  name="date"
                  component={renderDatePicker}
                  format={null}
                  textFieldStyle={{ width: '100%' }}
                  hintText="Start Date"
                />
              </div>
            </div>

            <div className="d-flex form-group">
              <Field
                name="startTime"
                component={renderTimePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="Start Time"
              />
            </div>
            <div className="d-flex form-group">
              <Field
                name="endTime"
                component={renderTimePicker}
                format={null}
                textFieldStyle={{ width: '100%' }}
                hintText="End Time"
              />
            </div>
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting || invalid}
                onClick={this.handleInsert}
              />
              <RaisedButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />,
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddDialog = reduxForm({
  form: 'addDialog',
  validate,
})(AddDialog);

const selector = formValueSelector('addDialog'); // <-- same as form name
AddDialog = connect(state => {
  // can select values individually
  const date = selector(state, 'date');
  const startTime = selector(state, 'startTime');
  const endTime = selector(state, 'endTime');
  let newStarTime;
  let newEndTime;
  if (date && startTime && endTime) {
    newStarTime = getDateTime(date, startTime);
    newEndTime = getDateTime(date, endTime);
  }

  return {
    newStarTime,
    newEndTime,
  };
})(AddDialog);

const INSERT_SCHEDULE_MUTATION = gql`
  mutation insertSchedule(
    $activity_id: ID!
    $room_id: ID!
    $start: Date!
    $end: Date!
  ) {
    insertSchedule(
      activity_id: $activity_id
      room_id: $room_id
      start: $start
      end: $end
    ) {
      id
    }
  }
`;

const INSERT_ACTIVITY_MUTATION = gql`
  mutation insertActivity($conference_id: ID!, $title: String!) {
    insertActivity(conference_id: $conference_id, title: $title) {
      id
      title
      schedules {
        start
        end
        room {
          id
          name
        }
      }
    }
  }
`;

export default compose(
  graphql(INSERT_ACTIVITY_MUTATION, {
    name: 'INSERT_ACTIVITY_MUTATION',
  }),
  graphql(INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
)(AddDialog);
