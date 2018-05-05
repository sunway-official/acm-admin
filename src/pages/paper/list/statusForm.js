import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { RaisedButton } from 'material-ui';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const StatusForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="status" component={renderRadioGroup}>
          <RadioButton value={1} label="Accept" style={styles.radioButton} />
          <RadioButton value={2} label="Reject" style={styles.radioButton} />
        </Field>
      </div>
      <div>
        <RaisedButton primary={true} label="Update" type="submit" />
        <RaisedButton
          className="marginLeft"
          label="Cancel"
          onClick={props.handleClose}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'StatusForm', // a unique identifier for this form
})(StatusForm);
