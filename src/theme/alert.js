import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import React from 'react';
import ExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';

export const alertOptions = {
  offset: 14,
  position: 'bottom right',
  theme: 'dark',
  time: 1500, // set time for all alert
  transition: 'scale',
};
export const styles = {
  faCheckCircleO: {
    width: 16,
    height: 16,
    color: 'rgb(76, 175, 80)',
  },
  faTriangle: {
    width: 16,
    height: 16,
    color: 'rgb(244, 67, 54)',
  },
};
export const MyFaCheck = () => <FaCheckCircleO style={styles.faCheckCircleO} />;
export const MyExclamationTriangle = () => (
  <ExclamationTriangle style={styles.faTriangle} />
);
export default {
  alertOptions,
  styles,
  MyFaCheck,
  MyExclamationTriangle,
};
