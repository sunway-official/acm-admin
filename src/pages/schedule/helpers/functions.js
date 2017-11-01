import * as moment from 'moment';
import React from 'react';

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
  array.map(item => {
    const schedules = getSchedules(item.schedules);
    item.schedules.map(schedule => {
      const start = moment(schedule.start)._d;
      const end = moment(schedule.end)._d;

      const event = {
        id: item.id,
        title: item.title,
        description: item.description,
        start_date: item.conference.start_date,
        end_date: item.conference.end_date,
        start: start,
        end: end,
        schedules: schedules,
      };
      events.push(event);
    });
  });

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

export const checkSchedules = (schedules, schedule) => {
  let countRoom = 0;
  let countDate = 0;
  for (let i = 0; i < schedules.length - 1; i = i + 1) {
    let item = schedules[i];
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
      let checkDurationTime =
        schedule.startTime > item.endTime || schedule.endTime < item.startTime;
      if (!checkDurationTime) {
        return false;
      }
    }
  }
  return true;
};

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
  checkSchedules,
};
