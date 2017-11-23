import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { ListItem } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { renderField } from '../../../../utils';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
import { listField } from './listField';
import validate from './validate';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/conference/info');
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    const ListFields = listField.map(field => (
      <div key={field.id}>
        <Row around="xs" className={field.className}>
          <Col xs={3}>
            <Row className="firstColunm">
              <ListItem
                className="list-item"
                primaryText={field.primaryText}
                disabled={true}
              />
            </Row>
          </Col>
          <Col xs={9}>
            <Row className="landing-page-second-column">
              <Field
                id="text-field-default"
                name={field.name}
                type={field.type}
                hintText={field.hintText}
                component={renderField}
                fullWidth={true}
              />
            </Row>
          </Col>
        </Row>
      </div>
    ));
    return (
      <div className="landing-page-form">
        <AppBar
          className="landing-page-app-bar"
          title="Edit Your Room Information"
          showMenuIconButton={false}
        />
        <Grid fluid className="landing-page-grid">
          <Row around="xs">
            <form onSubmit={handleSubmit} className="landing-page-redux-form">
              {ListFields}
              <Row around="xs">
                <Col xs={3}>
                  <Row className="firstColunm">
                    <ListItem
                      className="list-item"
                      primaryText="Status"
                      disabled={true}
                    />
                  </Row>
                </Col>
                <Col xs={9}>
                  <Row className="landing-page-second-column">
                    <Field
                      name="status"
                      component={renderSelectField}
                      fullWidth={true}
                    >
                      <MenuItem value="on" primaryText="On" />
                      <MenuItem value="off" primaryText="Off" />
                    </Field>
                  </Row>
                </Col>
              </Row>
              <Row className="personal-info-button" center="xs">
                <RaisedButton
                  className="btn save-change"
                  label="Save Change"
                  primary={true}
                  disabled={submitting}
                  type="submit"
                />
                <RaisedButton
                  className="btn cancel"
                  label="Cancel"
                  default={true}
                  onClick={this.handleCancel}
                />
              </Row>
            </form>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const roomDetail = ownProps.roomDetail;
  if (!roomDetail) {
    return {};
  }
  return {
    initialValues: {
      id: roomDetail.id,
      name: roomDetail.name,
      seats: roomDetail.seats,
      status: roomDetail.status,
    },
  };
};

RoomDetail = reduxForm({
  form: 'RoomDetail', // a unique identifier for this form
  validate,
})(RoomDetail);
export default compose(withRouter, connect(mapStateToProps, undefined))(
  RoomDetail,
);
