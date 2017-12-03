import FaCheck from 'react-icons/lib/fa/check';
import React from 'react';
import ExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';

export const alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 2000, // set time for all alert
  transition: 'scale',
};
export const styles = {
  faCheck: {
    width: 16,
    height: 16,
    color: 'rgb(76, 175, 80)',
  },
  faTriangle: {
    width: 16,
    height: 16,
    color: 'rgb(255, 235, 59)',
  },
};
export const MyFaCheck = () => <FaCheck style={styles.faCheck} />;
export const MyExclamationTriangle = () => (
  <ExclamationTriangle style={styles.faTriangle} />
);
export default {
  alertOptions,
  styles,
  MyFaCheck,
  MyExclamationTriangle,
};
