// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { Subheader, TextField } from 'material-ui';
// // import { TextField, DatePicker } from 'redux-form-material-ui';

// const validate = values => {
//   const errors = {};
//   const requiredFields = ['title', 'description'];
//   requiredFields.forEach(field => {
//     if (!values[field]) {
//       errors[field] = 'Required';
//     }
//   });
//   return errors;
// };

// const renderTextField = ({
//   input,
//   label,
//   meta: { touched, error },
//   ...custom
// }) => (
//   <TextField
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     {...custom}
//   />
// );

// class BasicInfo extends Component {
//   render() {
//     const minDate = new Date();
//     return (
//       <form>

//       </form>
//     );
//   }
// }

// BasicInfo = reduxForm({
//   form: 'conferenceInfo',
//   validate,
// })(BasicInfo);

// export default BasicInfo;
