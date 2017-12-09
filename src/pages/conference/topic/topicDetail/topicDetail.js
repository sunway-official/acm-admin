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
    maxHeight={200}
  />
);
class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/conference/topics-management');
  }
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
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
                type="text"
                hintText={field.hintText}
                component={renderField}
                multiLine={field.multiLine}
                rows={field.rows}
                rowsMax={field.rowsMax}
                fullWidth={true}
                autoFocus={field.autoFocus}
              />
            </Row>
          </Col>
        </Row>
      </div>
    ));
    const listColors = this.props.colorsList;
    const detail = this.props.topicDetail ? true : false;
    return (
      <div className="landing-page-form">
        <AppBar
          className="landing-page-app-bar"
          title="Edit Your Topic Information"
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
                      primaryText="Topic Color"
                      disabled={true}
                    />
                  </Row>
                </Col>
                <Col xs={9}>
                  <Row className="landing-page-second-column">
                    <Field
                      name="color_id"
                      component={renderSelectField}
                      fullWidth={true}
                    >
                      {listColors.map(color => (
                        <MenuItem
                          value={color.id}
                          primaryText={color.name}
                          key={color.id}
                          rightIcon={<div style={{ background: color.code }} />}
                        />
                      ))}
                    </Field>
                  </Row>
                </Col>
              </Row>
              <Row className="personal-info-button" center="xs">
                <RaisedButton
                  className="btn save-change"
                  label="Save Change"
                  primary={true}
                  disabled={submitting || detail ? pristine : submitting}
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
  const topicDetail = ownProps.topicDetail;
  if (!topicDetail) {
    return {};
  }
  return {
    initialValues: {
      id: topicDetail.id,
      name: topicDetail.name,
      color_code: topicDetail.color_code,
      description: topicDetail.description,
      color_id: topicDetail.color.id,
    },
  };
};

TopicDetail = reduxForm({
  form: 'TopicDetail', // a unique identifier for this form
  validate,
})(TopicDetail);
export default compose(withRouter, connect(mapStateToProps, undefined))(
  TopicDetail,
);
