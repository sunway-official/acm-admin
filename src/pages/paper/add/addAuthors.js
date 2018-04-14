import React from 'react';
import { Field } from 'redux-form';
import { ActionDeleteForever } from 'material-ui/svg-icons';
import { MenuItem, RaisedButton, Divider } from 'material-ui';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import renderCheckbox from 'components/renderCheckbox';
import { Subheader } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { countryData } from '../countryData';

const styles = {
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  smallIcon: {
    width: 36,
    height: 36,
  },

  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
};

const titleData = [
  {
    value: 'Prof',
    primaryText: 'Prof',
  },

  {
    value: 'Ac Prof',
    primaryText: 'Ac Prof',
  },

  {
    value: 'AssProf',
    primaryText: 'Ass Prof',
  },

  {
    value: 'Dr',
    primaryText: 'Dr',
  },

  {
    value: 'Mr',
    primaryText: 'Mr',
  },

  {
    value: 'Ms',
    primaryText: 'Ms',
  },
  {
    value: 'Mrs',
    primaryText: 'Mrs',
  },
];

class AddAuthors extends React.Component {
  componentDidMount() {
    this.props.fields.removeAll();
    this.props.fields.push({});
  }

  render() {
    const { fields, meta: { error, submitFailed } } = this.props;
    if (!fields) return <div />;
    return (
      <div>
        {fields.map((author, index) => (
          <div key={index}>
            {index === 0 ? (
              ''
            ) : (
              <div>
                <Divider style={styles.divider} />
                <div className="d-flex align-items-center justify-content-space-around">
                  <h4 style={{ paddingTop: '0px' }}>Author #{index + 1}</h4>
                  <RaisedButton
                    style={{ minWidth: '50px' }}
                    onClick={() => fields.remove(index)}
                    icon={<ActionDeleteForever />}
                    primary={true}
                  />
                </div>
              </div>
            )}
            <div className="paper-submit-block">
              <Subheader className="subheader submit-header">Authors</Subheader>
              <div className="d-flex form-group">
                <label>First name :</label>
                <Field
                  name={`${author}.firstname`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the first name"
                />
              </div>
              <div className="d-flex form-group">
                <label>Last name :</label>
                <Field
                  name={`${author}.lastname`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the last name"
                />
              </div>
              <div className="d-flex form-group">
                <label>Title :</label>
                <Field
                  name={`${author}.title`}
                  component={renderSelectField}
                  fullWidth={true}
                  hintText="Choose a title"
                >
                  {titleData.map(title => {
                    return (
                      <MenuItem
                        key={title.value}
                        value={title.value}
                        primaryText={title.primaryText}
                      />
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex form-group">
                <label>Email:</label>
                <Field
                  name={`${author}.email`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the email"
                />
              </div>
              <div className="d-flex form-group">
                <label>Institution:</label>
                <Field
                  name={`${author}.organization`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the institution"
                />
              </div>
              <div className="d-flex form-group">
                <label>Street :</label>
                <Field
                  name={`${author}.authorStreet`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the street"
                />
              </div>
              <div className="d-flex form-group">
                <label>City :</label>
                <Field
                  name={`${author}.authorCity`}
                  component={CustomInput}
                  fullWidth={true}
                  hintText="Enter the city"
                />
              </div>
              <div className="d-flex form-group">
                <label>Country :</label>
                <Field
                  name={`${author}.authorCountry`}
                  component={renderSelectField}
                  fullWidth={true}
                  hintText="Choose the country"
                >
                  {countryData.map(country => {
                    return (
                      <MenuItem
                        key={country.label}
                        value={country.label}
                        primaryText={country.label}
                      />
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex form-group">
                <label>Zipcode :</label>
                <Field
                  name={`${author}.authorZipcode`}
                  component={CustomInput}
                  fullWidth={true}
                  type="number"
                  hintText="Enter the zipcode"
                />
              </div>
              <div className="form-group">
                <div className="f-right pb-6">
                  <Field
                    label="Corresponding"
                    name={`${author}.corresponding`}
                    value={false}
                    component={renderCheckbox}
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex add-schedule-icon btn-group">
          <FloatingActionButton
            mini={true}
            className="f-right mb-20"
            onClick={() => fields.push({})}
            tooltip="Add Author"
            disabled={this.props.checkError}
          >
            <ContentAdd />
          </FloatingActionButton>
          {submitFailed && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     checkError: state.schedule.error,
//   };
// };

export default AddAuthors;
