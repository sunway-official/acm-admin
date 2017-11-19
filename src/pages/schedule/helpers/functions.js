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
          room: schedule.room.name,
        };
        events.push(event);
      });
    });
  }

  return events;
};

export const getDateTime = (date, time) => {
  const dateTime = moment(date, 'YYYY MM DD HH:mm')
    .set('hour', time.getHours())
    .set('minute', time.getMinutes());
  return dateTime;
};

/**
 * Event
 * @param {*} event
 */
export const Event = ({ event }) => {
  const checkDate = moment(event.start).isAfter(moment());

  if (checkDate)
    return (
      <div
        title={
          moment(event.start).format('LT') +
          ' - ' +
          moment(event.end).format('LT') +
          ': ' +
          event.title +
          ' Room - ' +
          event.room
        }
      >
        <span>
          {event.title} <br />
          Room - {event.room}
        </span>
      </div>
    );
  return (
    <div
      className="my-event"
      title={
        moment(event.start).format('LT') +
        ' - ' +
        moment(event.end).format('LT') +
        ': ' +
        event.title +
        ' Room - ' +
        event.room
      }
    >
      <span>
        {event.title} <br />
        Room - {event.room}
      </span>
    </div>
  );
};

/**
 * EventAgenda
 * @param {*} event
 */
export const EventAgenda = ({ event }) => {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
    </span>
  );
};

/**
 *
 * @param {*} schedules
 */
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
        moment(item.date).format('YYYY MM DD') ===
          moment(schedule.date).format('YYYY MM DD');

      if (checkRoom) {
        countRoom = countRoom + 1;
      }
      if (checkDate) {
        countDate = countDate + 1;
      }
      if (countDate > 0 && countRoom > 0 && schedule.start && schedule.end) {
        const newStarTime = getDateTime(schedule.date, schedule.start);
        const newEndTime = getDateTime(schedule.date, schedule.end);
        const itemStarTime = getDateTime(item.date, item.start);
        const itemEndTime = getDateTime(item.date, item.end);
        let checkDurationTime =
          newStarTime.isAfter(itemEndTime) || newEndTime.isBefore(itemStarTime);
        if (!checkDurationTime) {
          return true;
        }
      }
    }
  }
  return false;
};

export const compareDate = (date1, date2, strFormat = 'YYYY MM DD') => {
  const str1 = date1.format(strFormat);
  const str2 = date2.format(strFormat);
  return str1 === str2;
};

/**
 *
 * @param {*} date1
 * @param {*} date2
 * @param {*} strFormat
 */
export const isBeforeDate = (date1, date2, strFormat = 'YYYY MM DD HH:mm') => {
  date1.format(strFormat);
  date2.format(strFormat);
  return date1.isBefore(date2);
};

export const removeSchedulesExists = (allSchedules, schedules) => {
  for (let i = 0; i < allSchedules.length; i += 1) {
    let item = allSchedules[i];
    for (let j = 0; j < schedules.length; j += 1) {
      let schedule = schedules[j];
      if (item.id === schedule.id) {
        allSchedules.splice(i, 1);
        i -= 1;
      }
    }
  }
  return allSchedules;
};

// check all schedule when insert
export const checkAllSchedules = (allSchedules, schedules) => {
  for (let i = 0; i < allSchedules.length; i += 1) {
    let item = allSchedules[i];
    for (let j = 0; j < schedules.length; j += 1) {
      let schedule = schedules[j];
      let countDate = 0;
      let countRoom = 0;
      const checkDate = compareDate(
        item.date,
        moment(schedule.date, 'YYYY MM DD'),
        'YYYY MM DD',
      );
      if (checkDate) {
        countDate += 1;
      }
      const checkRoom =
        schedule.room && item.room && item.room.id === schedule.room;
      if (checkRoom) {
        countRoom += 1;
      }
      if (countDate > 0 && countRoom > 0 && schedule.start && schedule.end) {
        const newStarTime = getDateTime(schedule.date, schedule.start);
        const newEndTime = getDateTime(schedule.date, schedule.end);
        const itemStarTime = getDateTime(item.date, item.start);
        const itemEndTime = getDateTime(item.date, item.end);
        let checkDurationTime =
          newStarTime.isAfter(itemEndTime) || newEndTime.isBefore(itemStarTime);
        if (!checkDurationTime) {
          return j;
        }
      }
    }
  }
  return -1;
};

// get all schedule of conference
export const getAllSchedules = events => {
  let allSchedules = [];
  let eventsId = [];

  // eslint-disable-next-line array-callback-return
  events.map(event => {
    // eslint-disable-next-line array-callback-return
    if (!eventsId.includes(event.id)) {
      allSchedules = allSchedules.concat(event.schedules);
      eventsId.push(event.id);
    }
  });
  return allSchedules;
};

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
  checkSchedules,
  getAllSchedules,
  checkAllSchedules,
  removeSchedulesExists,
  compareDate,
  isBeforeDate,
};
