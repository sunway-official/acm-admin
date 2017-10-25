import React from 'react';
import { Field } from 'redux-form';
import { ActionAlarmAdd, ActionDeleteForever } from 'material-ui/svg-icons';
import { MenuItem, RaisedButton, IconButton, Divider } from 'material-ui';
import moment from 'moment';
import {
  renderDatePicker,
  renderSelectField,
  renderTimePicker,
} from './validate';

const styles = {
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
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

class renderSchedules extends React.Component {
  componentDidMount() {
    this.props.fields.removeAll();
    const event = this.props.event;
    const schedules = event.schedules;
    const length = schedules.length;
    for (let i = 0; i < length; i = i + 1) {
      const schedule = {
        date: new Date(schedules[i].date),
        startTime: new Date(schedules[i].start),
        endTime: new Date(schedules[i].end),
        room: schedules[i].room.id,
      };
      this.props.fields.push(schedule);
    }
  }

  render() {
    const { rooms, fields, meta: { error, submitFailed } } = this.props;
    if (!fields) return <div />;
    return (
      <div>
        {fields.map((schedule, index) => {
          return (
            <div key={index}>
              {index === 0 ? (
                ''
              ) : (
                <div>
                  <Divider style={styles.divider} />
                  <div className="d-flex align-items-center justify-content-space-around">
                    <h4>Schedule #{index + 1}</h4>
                    <RaisedButton
                      style={{ minWidth: '50px' }}
                      onClick={() => fields.remove(index)}
                      icon={<ActionDeleteForever />}
                      primary={true}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex">
                <div className="d-flex form-group">
                  <label className="schedule-date">Date:</label>
                  <Field
                    name={`${schedule}.date`}
                    component={renderDatePicker}
                    format={null}
                    textFieldStyle={{ width: '100%' }}
                    hintText="Activity Date"
                    value={new Date()}
                  />
                </div>
                <div className="d-flex form-group" style={{ width: '300px' }}>
                  <label className="text-align-center room">Room :</label>
                  <Field
                    name={`${schedule}.room`}
                    component={renderSelectField}
                  >
                    {rooms.map(room => {
                      return (
                        <MenuItem
                          key={room.id}
                          value={room.id}
                          primaryText={room.name}
                        />
                      );
                    })}
                  </Field>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-flex form-group">
                  <label className="schedule-time-from">Start From :</label>
                  <Field
                    name={`${schedule}.startTime`}
                    value={new Date()}
                    component={renderTimePicker}
                    format={null}
                    hintText="Begin Schedule"
                    textFieldStyle={{ width: '100%' }}
                  />
                </div>
                <div className="d-flex form-group">
                  <label className="text-align-center">To :</label>
                  <Field
                    name={`${schedule}.endTime`}
                    value={new Date()}
                    component={renderTimePicker}
                    format={null}
                    hintText="End Schedule"
                    textFieldStyle={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="d-flex add-schedule-icon btn-group">
          <IconButton
            iconStyle={styles.smallIcon}
            style={styles.small}
            onClick={() => fields.push({})}
            tooltip="Add Schedule"
          >
            <ActionAlarmAdd />
          </IconButton>
          {submitFailed && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

export default renderSchedules;
