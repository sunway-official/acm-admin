import React, { PureComponent } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  RaisedButton,
  FlatButton,
} from 'material-ui';
import { reduxForm } from 'redux-form';
import validate from './validate';
import Fields from './Fields';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
class OrganizationDate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Fields />;
      case 1:
        return '';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return '';
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Abstracts Submission Date</StepLabel>
            </Step>
            <Step>
              <StepLabel>Paper Submission Date</StepLabel>
            </Step>
            <Step>
              <StepLabel>Conference Date</StepLabel>
            </Step>
          </Stepper>
          <div>
            {finished ? (
              <div>
                <a
                  href=""
                  onClick={event => {
                    event.preventDefault();
                    this.setState({ stepIndex: 0, finished: false });
                  }}
                >
                  Click here
                </a>
                to reset the example.
              </div>
            ) : (
              <div>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{ marginTop: 12 }}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Submit' : 'Next'}
                    primary={true}
                    type="submit"
                    onClick={this.handleNext}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
}
OrganizationDate = reduxForm({
  form: 'OrganizationDate',
  validate,
})(OrganizationDate);
const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};
export default compose(withApollo, connect(undefined, mapDispatchToProps))(
  OrganizationDate,
);
