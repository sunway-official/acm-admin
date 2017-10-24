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
        description: item.description,
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
  for (let i = 0; i < schedules.length; i = i + 1) {
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
    console.log('------------');
    console.log('Date ' + countDate);
    console.log('Room ' + countRoom);
    console.log('Start ' + countStartTime);
    console.log('End ' + countEndTime);
    if (
      countRoom > 1 &&
      countDate > 1 &&
      countStartTime > 1 &&
      countEndTime > 1
    ) {
      return true;
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
