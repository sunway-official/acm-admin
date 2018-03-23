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
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
import { mutations } from '../helpers';
class OrganizationDate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }
  async handleUpdateDeadline({
    id,
    dl_submit_abstract,
    dl_review_abstract,
    dl_release_abstract,
    dl_re_submit_abstract,
    dl_re_review_abstract,
    dl_release_final_abstract,
    dl_submit_paper,
    dl_review_paper,
    dl_release_paper,
    dl_re_submit_paper,
    dl_re_review_paper,
    dl_release_final_paper,
  }) {
    try {
      const deadline = await this.props.UPDATE_CONFERENCE_MUTATION({
        variables: {
          id: this.props.conference_id,
          dl_submit_abstract: dl_submit_abstract,
          dl_review_abstract: dl_review_abstract,
          dl_release_abstract: dl_release_abstract,
          dl_re_submit_abstract: dl_re_submit_abstract,
          dl_re_review_abstract: dl_re_review_abstract,
          dl_release_final_abstract: dl_release_final_abstract,
          dl_submit_paper: dl_submit_paper,
          dl_review_paper: dl_review_paper,
          dl_release_paper: dl_release_paper,
          dl_re_submit_paper: dl_re_submit_paper,
          dl_re_review_paper: dl_re_review_paper,
          dl_release_final_paper: dl_release_final_paper,
        },
      });
    } catch (error) {
      console.log('error');
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 1) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
    if (stepIndex === 1) {
      alert('Submit');
    }
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
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
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
OrganizationDate = reduxForm({
  form: 'OrganizationDate',
  validate,
})(OrganizationDate);
const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
      fieldError: state.schedule.error,
      conference_id: state.auth.currentUser.currentConference.id,
    };
  }
};
const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};
export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
)(OrganizationDate);
