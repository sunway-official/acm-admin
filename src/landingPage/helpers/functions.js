import * as moment from 'moment';

export const getSchedules = array => {
  let schedules = [];
  array.map(item => {
    const date = moment(item.start, 'YYYY MM DD');
    const start = moment(item.start)._d;
    const end = moment(item.end)._d;

    const schedule = {
      id: item.id,
      date: date,
      start: start,
      end: end,
      room: item.room,
    };
    schedules.push(schedule);
  });
  return schedules;
};

export const getEvents = array => {
  let events = [];
  if (array) {
    array.map(item => {
      const schedules = getSchedules(item.schedules);
      item.schedules.map(schedule => {
        const start = moment(schedule.start)._d;
        const end = moment(schedule.end)._d;

        const event = {
          id: item.id,
          title: item.title,
          description: item.description,
          start: start,
          end: end,
          schedules: schedules,
        };
        events.push(event);
      });
    });
  }

  return events;
};

export const getDateTime = (date, time) => {
  const dateTime = moment(date, 'YYYY MM DD')
    .set('hour', time.getHours())
    .set('minute', time.getMinutes());

  return dateTime;
};

export default {
  getEvents,
  getDateTime,
};
