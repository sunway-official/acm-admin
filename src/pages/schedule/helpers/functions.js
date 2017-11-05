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
  const dateTime = moment(date, 'YYYY MM DD HH:mm')
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
  // console.log(schedules);
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
        // console.log(checkDurationTime);
        if (!checkDurationTime) {
          return true;
        }
      }
    }
  }
  return false;
};

export const compareDate = (date1, date2) => {
  const str1 = date1.format('YYYY MM DD');
  const str2 = date2.format('YYYY MM DD');
  console.log(str1);
  console.log(str2);
  // const check =
  // new Date(date1).getDate() === new Date(date2).getDate() &&
  // new Date(date1).getMonth() === new Date(date2).getMonth() &&
  // new Date(date1).getFullYear() === new Date(date2).getFullYear();
  return str1 === str2;
};

// check all schedule when insert
export const checkAllSchedules = (allSchedules, schedules) => {
  // console.log(allSchedules);
  // console.log(schedule);
  let countDate = 0;
  let countRoom = 0;
  for (let i = 0; i < allSchedules.length; i += 1) {
    let item = allSchedules[i];
    for (let j = 0; j < schedules.length; j += 1) {
      let schedule = schedules[j];
      const checkDate = compareDate(
        item.date,
        moment(schedule.date, 'YYYY MM DD'),
      );
      if (checkDate) {
        countDate += 1;
      }
      const checkRoom =
        schedule.room && item.room && item.room.id === schedule.room;
      if (checkRoom) {
        countRoom += 1;
      }
      console.log(countRoom);
      // if (countDate > 0 && countRoom > 0 && schedule.start && schedule.end) {
      //   const newStarTime = getDateTime(schedule.date, schedule.start);
      //   const newEndTime = getDateTime(schedule.date, schedule.end);
      //   const itemStarTime = getDateTime(item.date, item.start);
      //   const itemEndTime = getDateTime(item.date, item.end);
      //   let checkDurationTime =
      //     newStarTime.isAfter(itemEndTime) || newEndTime.isBefore(itemStarTime);
      //   // console.log(checkDurationTime);
      //   if (!checkDurationTime) {
      //     return true;
      //   }
      // }
    }
  }
  console.log(countDate - schedules.length);
  if (countDate - schedules.length > 0 && countRoom > 0) return true; // co trung
  return false;
  // console.log(allSchedules);
  // allSchedules.map(async item => {
  //   console.log(item);
  //   const checkDate = compareDate(
  //     item.date,
  //     moment(schedule.date, 'YYYY MM DD'),
  //   );
  //   if (checkDate === true) return true;
  //   console.log(checkDate);
  // });
  // console.log(schedule);
  // return false;

  // console.log(schedule);
  // let countRoom = 0;
  // let countDate = 0;
  // let count = 0;
  // for (let i = 0; i < allSchedules.length; i = i + 1) {
  //   let item = allSchedules[i];
  //   // console.log(item);
  //   // let checkRoom =
  //   //   schedule.room && item.room && item.room.id === schedule.room;
  //   // const currentSchedule = moment(schedule.date)
  //   //   .hours(0)
  //   //   .minutes(0)
  //   //   .milliseconds(0);
  //   // console.log(item.date);
  //   // console.log(schedule.date);
  //   // const current = new Date(schedule.date);
  //   // console.log(current.getDate());
  //   // console.log(current.getUTCDate());
  //   // console.log(current.getDate());
  //   let checkDate = false;
  //   if (schedule.date != null)
  //     checkDate = compareDate(item.date, moment(schedule.date, 'YYYY MM DD'));
  //   // console.log(checkDate);

  //   if (checkDate) {
  //     return true;
  //   }
  // }
  // return false;
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

// export const formatSchedules = schedules => {
//   console.log(schedules);
//   schedules.map(schedule => {
//     schedule.date = moment(schedule.date);
//   });
//   return schedules;
// };

export default {
  EventAgenda,
  Event,
  getEvents,
  getDateTime,
  checkSchedules,
  getAllSchedules,
  checkAllSchedules,
  // formatSchedules,
};
