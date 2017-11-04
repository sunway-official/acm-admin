import * as moment from 'moment';
import React from 'react';

export const getSchedules = array => {
  let schedules = [];
  // eslint-disable-next-line array-callback-return
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
    // eslint-disable-next-line array-callback-return
    array.map(item => {
      const schedules = getSchedules(item.schedules);
      // eslint-disable-next-line array-callback-return
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

export const Event = ({ event }) => {
  return (
    <div
      title={
        moment(event.start).format('LT') +
        ' - ' +
        moment(event.end).format('LT') +
        ': ' +
        event.title +
        ' Room - ' +
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

export const checkSchedules = schedules => {
  let countRoom = 0;
  let countDate = 0;
  for (let i = 0; i < schedules.length - 1; i = i + 1) {
    let item = schedules[i];
    for (let j = i + 1; j < schedules.length; j = j + 1) {
      let schedule = schedules[j];
      let checkRoom = schedule.room && item.room && item.room === schedule.room;
      let checkDate =
        schedule.date &&
        item.date &&
        new Date(item.date).getDay() === new Date(schedule.date).getDay() &&
        new Date(item.date).getMonth() === new Date(schedule.date).getMonth() &&
        new Date(item.date).getFullYear() ===
          new Date(schedule.date).getFullYear();

      if (checkRoom) {
        countRoom = countRoom + 1;
      }
      if (checkDate) {
        countDate = countDate + 1;
      }
      if (
        countDate > 0 &&
        countRoom > 0 &&
        schedule.startTime &&
        schedule.endTime
      ) {
        const newStarTime = getDateTime(schedule.date, schedule.startTime);
        const newEndTime = getDateTime(schedule.date, schedule.endTime);
        const itemStarTime = getDateTime(item.date, item.startTime);
        const itemEndTime = getDateTime(item.date, item.endTime);
        let checkDurationTime =
          newStarTime > itemEndTime || newEndTime < itemStarTime;
        if (!checkDurationTime) {
          return j;
        }
      }
    }
  }
  return 0;
};

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
  checkSchedules,
};
