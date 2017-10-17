import * as moment from 'moment';
import React from 'react';

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

export const Event = ({ event }) => {
  return (
    <div
      title={
        moment(event.start).format('LT') +
        ' - ' +
        moment(event.end).format('LT') +
        ': ' +
        event.title +
        '. Room - ' +
        event.room.name
      }
    >
      <span>
        {event.title} <br />
        Room - {event.room.name}
      </span>
    </div>
  );
};

export const EventAgenda = ({ event }) => {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
    </span>
  );
};

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
};
