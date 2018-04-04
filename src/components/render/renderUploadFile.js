import React from 'react';

const renderUploadFile = ({ input, meta: { touched, error }, ...custom }) => (
  <input type="file" accept="application/pdf" {...custom} {...input} />
);

export default renderUploadFile;
