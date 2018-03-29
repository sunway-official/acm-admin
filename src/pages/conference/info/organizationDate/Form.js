import React, { PureComponent } from 'react';
import { Step, Stepper, StepLabel, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';
import validate from './validate';
import Fields from './Fields';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
import { conferenceOperations } from 'store/ducks/conference';
class SetDeadlineForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 1) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
    this.props.setStepIndex(stepIndex + 1);
  };
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
    this.props.setStepIndex(stepIndex - 1);
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Fields stepIndex={0} />;
      case 1:
        return <Fields stepIndex={1} />;
      default:
        return '';
    }
  }

  render() {
    const { stepIndex } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div style={{ width: '100%', maxWidth: 1200, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Abstracts Submission Date</StepLabel>
            </Step>
            <Step>
              <StepLabel>Paper Submission Date</StepLabel>
            </Step>
          </Stepper>
          <div>
            <div>{this.getStepContent(stepIndex)}</div>
            <div style={{ marginTop: 12 }}>
              <RaisedButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={() => this.handlePrev()}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={stepIndex === 1 ? 'Submit' : 'Next'}
                primary={true}
                type="submit"
                onClick={
                  this.props.fieldError === false
                    ? () => this.handleNext()
                    : () => {}
                }
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
SetDeadlineForm = reduxForm({
  form: 'SetDeadlineForm',
  validate,
})(SetDeadlineForm);
const mapStateToProps = state => {
  if (state) {
    // console.log('index', state.conference.stepIndex);
    console.log('eror', state.schedule.error);
    return {
      fieldError: state.schedule.error,
      conference_id: state.auth.currentUser.currentConference.id,
      stepIndex: state.conference.stepIndex,
    };
  }
};
const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
    setStepIndex: stepIndex => {
      dispatch(conferenceOperations.setStepIndexOperation(stepIndex));
    },
  };
};
export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
)(SetDeadlineForm);
