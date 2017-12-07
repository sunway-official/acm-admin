import { functions } from './helpers';
import moment from 'moment';

const validate = (values, props) => {
  const errors = {};
  const ArrayErrors = [];
  let requiredFields;
  if (props.status === 'with-paper') {
    requiredFields = ['paper', 'date', 'start', 'end', 'room'];
  } else {
    requiredFields = ['title', 'description', 'date', 'start', 'end', 'room'];
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.end <= values.start) {
    errors.end = 'End time of schedule must be greater than start time!!!';
  }
  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: '.' };
  } else {
    const schedules = values.schedules;
    let allSchedules = props.allSchedules;
    if (schedules.length > 0 && schedules[0].id) {
      allSchedules = functions.removeSchedulesExists(allSchedules, schedules);
    }
    const length = schedules.length;
    let scheduleErrors = {};
    let checkError = 0;
    if (schedules.length > 0 && schedules[length - 1].date) {
      checkError = functions.checkAllSchedules(allSchedules, schedules);
      if (checkError >= 0) {
        scheduleErrors.room = 'This room was chosen';
        ArrayErrors[checkError] = scheduleErrors;
      }
    }

    values.schedules.forEach((schedule, scheduleIndex) => {
      scheduleErrors = {};
      if (!schedule || !schedule.date) {
        scheduleErrors.date = 'This field is required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.room) {
        scheduleErrors.room = 'This field is required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.start) {
        scheduleErrors.start = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      let startHours = 0;
      let endHours = 0;
      let startMinutes = 0;
      let endMinutes = 1;
      if (!schedule || !schedule.end) {
        scheduleErrors.end = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      } else if (schedule.start && schedule.end) {
        startHours = moment(schedule.start).hours();
        endHours = moment(schedule.end).hours();
        startMinutes = moment(schedule.start).minutes();
        endMinutes = moment(schedule.end).minutes();
      }

      if (
        startHours > endHours ||
        (startHours === endHours && startMinutes >= endMinutes)
      ) {
        scheduleErrors.end =
          'End time of schedule must be greater than start time and in the same day!!!';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      if (
        schedule.date &&
        (moment(schedule.date, 'DD/MM/YYYY HH:mm').isBefore(
          moment(props.start_date, 'DD/MM/YYYY HH:mm'),
        ) ||
          moment(schedule.date, 'DD/MM/YYYY HH:mm').isAfter(
            moment(props.end_date, 'DD/MM/YYYY HH:mm'),
          ))
      ) {
        scheduleErrors.date =
          'Please choose date from ' +
          moment(props.start_date).format('DD/MM/YYYY') +
          ' to ' +
          moment(props.end_date).format('DD/MM/YYYY');
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      // check current date
      if (schedule.date && schedule.start && schedule.end) {
        const currentDate = moment();
        const newStarTime = functions.getDateTime(
          schedule.date,
          schedule.start,
        );
        if (newStarTime.isBefore(currentDate)) {
          scheduleErrors.start = 'This time is passed';
          ArrayErrors[scheduleIndex] = scheduleErrors;
        }
      }

      // check allschedules
      if (
        scheduleIndex === values.schedules.length - 1 &&
        values.schedules.length !== 1
      ) {
        const checkError = functions.checkSchedules(values.schedules);
        if (checkError) {
          scheduleErrors.room = 'This room was chosen';
          ArrayErrors[scheduleIndex] = scheduleErrors;
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
