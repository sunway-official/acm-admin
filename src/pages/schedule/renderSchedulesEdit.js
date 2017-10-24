import React from 'react';
import { Field } from 'redux-form';
import { ActionDeleteForever } from 'material-ui/svg-icons';
import { MenuItem, RaisedButton, Divider } from 'material-ui';
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

class renderSchedulesEdit extends React.Component {
  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
  }
  componentDidMount() {
    this.props.fields.removeAll();
    this.props.fields.push({});
  }

  onFocus() {
    console.log(this.props);
  }
  render() {
    const { rooms, fields } = this.props;
    if (!fields) return <div />;
    return (
      <div>
        {fields.map((schedule, index) => (
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
                />
              </div>
              <div className="d-flex form-group" style={{ width: '300px' }}>
                <label className="text-align-center room">Room :</label>
                <Field name={`${schedule}.room`} component={renderSelectField}>
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
                  component={renderTimePicker}
                  format={null}
                  hintText="End Schedule"
                  textFieldStyle={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default renderSchedulesEdit;
