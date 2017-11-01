import { functions } from './helpers';
import moment from 'moment';

const validate = (values, props) => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = [
    'title',
    'description',
    'date',
    'startTime',
    'endTime',
    'room',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.endTime <= values.startTime) {
    errors.endTime = 'End time of schedule must be greater than start time!!!';
  }
  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: '.' };
  } else {
    values.schedules.forEach((schedule, scheduleIndex) => {
      const scheduleErrors = {};
      if (!schedule || !schedule.date) {
        scheduleErrors.date = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.room) {
        scheduleErrors.room = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.startTime) {
        scheduleErrors.startTime = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      let startTimeHours = 0;
      let endTimeHours = 0;
      let startTimeMinutes = 0;
      let endTimeMinutes = 1;
      if (!schedule || !schedule.endTime) {
        scheduleErrors.endTime = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      } else if (schedule.startTime && schedule.endTime) {
        startTimeHours = moment(schedule.startTime).hours();
        endTimeHours = moment(schedule.endTime).hours();
        startTimeMinutes = moment(schedule.startTime).minutes();
        endTimeMinutes = moment(schedule.endTime).minutes();
      }

      if (
        startTimeHours > endTimeHours ||
        (startTimeHours === endTimeHours && startTimeMinutes >= endTimeMinutes)
      ) {
        scheduleErrors.endTime =
          'End time of schedule must be greater than start time and in the same day!!!';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      if (
        schedule.date &&
        (moment(schedule.date).isBefore(moment(props.start_date)) ||
          moment(schedule.date).isAfter(moment(props.end_date)))
      ) {
        scheduleErrors.date =
          'Please choose date from ' +
          moment(props.start_date).format('DD/MM/YYYY') +
          ' to ' +
          moment(props.end_date).format('DD/MM/YYYY');
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      if (
        scheduleIndex === values.schedules.length - 1 &&
        values.schedules.length !== 1
      ) {
        const check = functions.checkSchedules(values.schedules);
        if (!check == 0) {
          scheduleErrors.room = 'This room is choosing';
          ArrayErrors[check] = scheduleErrors;
        }
      }
    });
    if (ArrayErrors.length) {
      errors.schedules = ArrayErrors;
      props.checkError(true);
    } else {
      props.checkError(false);
    }
  }

  return errors;
};

export default validate;
