// import { createStore } from 'redux';

// const CO_ORGANIZER_UPDATE_DATA = 'CO_ORGANIZER_UPDATE_DATA';
// const CO_ORGANIZER_NAME = 'CO_ORGANIZER_NAME';
// const CO_ORGANIZER_WEBSITE = 'CO_ORGANIZER_WEBSITE';
// const CO_ORGANIZER_EMAIL = 'CO_ORGANIZER_EMAIL';
// const CO_ORGANIZER_PHONE_NUMBER = 'CO_ORGANIZER_PHONE_NUMBER';

// const dataReducer = (
//   CO_ORGANIZER_NAME,
//   CO_ORGANIZER_WEBSITE,
//   CO_ORGANIZER_EMAIL,
//   CO_ORGANIZER_PHONE_NUMBER,
// ) => {
//   return {
//     CO_ORGANIZER_NAME,
//     CO_ORGANIZER_WEBSITE,
//     CO_ORGANIZER_EMAIL,
//     CO_ORGANIZER_PHONE_NUMBER,
//   };
// };

// let store = createStore(dataReducer);
// console.log(store.getState());
// const updateData = () => ({ type: CO_ORGANIZER_UPDATE_DATA });

const UPDATE_DATA = 'UPDATE_DATA';
const GET_DATA = 'GET_DATA';
