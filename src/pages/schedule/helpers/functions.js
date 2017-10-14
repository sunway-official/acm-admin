import * as moment from 'moment';

export const getEvents = array => {
  let events = [];
  array.map(item =>
    item.schedules.map(schedule => {
      const date = moment(schedule.start, 'YYYY MM DD');
      const start = moment(schedule.start)._d;
      const end = moment(schedule.end)._d;

      const event = {
        id: item.id,
        title: item.title,
        date: date,
        start: start,
        end: end,
        scheduleId: schedule.id,
        room: {
          id: schedule.room.id,
          name: schedule.room.name,
        },
      };
      events.push(event);
      return events;
    }),
  );

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
