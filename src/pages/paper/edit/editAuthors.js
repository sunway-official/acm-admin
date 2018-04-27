import React from 'react';
import { Field } from 'redux-form';
import { MenuItem, Divider } from 'material-ui';
import CustomInput from 'components/CustomInput';
import { renderSelectField } from 'components/render';
import renderCheckbox from 'components/renderCheckbox';
import { Subheader } from 'material-ui';
import { countryData } from '../countryData';
import { titleData } from '../authorTitleData';
import { connect } from 'react-redux';
import { paperOperations } from 'store/ducks/paper';

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

class EditAuthors extends React.Component {
  constructor() {
    super();
    this.state = {
      deleteIds: [],
    };
  }

  componentDidMount() {
    this.props.fields.removeAll();
    const authors = this.props.authors.editAuthors;
    const length = authors.length;
    for (let i = 0; i < length; i = i + 1) {
      let author = {};
      let name = [];
      let corresponding = false;
      name = authors[i].author_name.split(' ');
      if (authors[i].corresponding === 2) {
        corresponding = true;
      } else {
        corresponding = false;
      }
      author = {
        id: authors[i].id,
        firstname: name[1],
        lastname: name[0],
        title: authors[i].author_title,
        email: authors[i].author_email,
        organization: authors[i].author_organization,
        authorStreet: authors[i].author_street,
        authorCountry: authors[i].author_country,
        authorCity: authors[i].author_city,
        authorZipcode: authors[i].author_zipcode,
        corresponding: corresponding,
      };
      this.props.fields.push(author);
    }
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
                <div className="d-flex align-items-center justify-content-space-around" />
              </div>
            )}
            <div className="paper-submit-block">
              <Subheader className="subheader submit-header">
                Author #{index + 1}
              </Subheader>
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
          {/* <FloatingActionButton
            mini={true}
            className="f-right mb-20"
            onClick={() => fields.push({})}
            tooltip="Edit Author"
            disabled={this.props.checkError}
          >
            <ContentAdd />
          </FloatingActionButton> */}
          {submitFailed && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteAuthors: ids =>
      dispatch(paperOperations.deleteAuthorIdsOperation(ids)),
  };
};

export default connect(undefined, mapDispatchToProps)(EditAuthors);
