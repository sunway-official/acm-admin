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
  let countStartTime = 0;
  let countEndTime = 0;
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

    let checkStartTime =
      schedule.startTime &&
      item.startTime &&
      schedule.startTime.getHours() === item.startTime.getHours() &&
      schedule.startTime.getMinutes() === item.startTime.getMinutes();

    let checkEndTime =
      schedule.endTime &&
      item.endTime &&
      schedule.endTime.getHours() === item.endTime.getHours() &&
      schedule.endTime.getMinutes() === item.endTime.getMinutes();

    if (checkRoom) {
      countRoom = countRoom + 1;
    }
    if (checkDate) {
      countDate = countDate + 1;
    }
    if (checkStartTime) {
      countStartTime = countStartTime + 1;
    }
    if (checkEndTime) {
      countEndTime = countEndTime + 1;
    }
    if (
      countDate > 0 &&
      countRoom > 0 &&
      countStartTime > 0 &&
      countEndTime > 0
    ) {
      return true;
    } else {
      countRoom = 0;
      countDate = 0;
      countStartTime = 0;
      countEndTime = 0;
    }
  }
  return false;
};

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
  checkSchedules,
};
