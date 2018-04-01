import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, MenuItem, Subheader, Dialog } from 'material-ui';
import { renderSchedulesEdit, renderSelectField } from '../../render';
import { Link } from 'react-router-dom';
import { queries, mutations } from '../../helpers';
import { compose, withApollo, graphql } from 'react-apollo';
import { scheduleOperations, scheduleActions } from 'store/ducks/schedule';
import { connect } from 'react-redux';
import validate from '../../validate';
import Loading from 'components/render/renderLoading';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import { withRouter } from 'react-router';

class EditActivityPaper extends Component {
  constructor() {
    super();
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      papers: [],
      count: 0,
      disablePaper: true,
    };
  }
  showAlertSuccess = () => {
    this.msg.success('Deleted success!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/activities');
      },
    });
  };

  async handleChangeTopic(event, value) {
    const papers = await this.props.client.query({
      query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
      variables: {
        topic_id: value,
      },
    });
    const { loading, getAllPapersByTopicID } = papers.data;
    if (!loading) {
      // eslint-disable-next-line
      if (getAllPapersByTopicID.length == 0) {
        this.setState({
          papers: [],
          count: 1,
          disablePaper: true,
        });
      } else {
        this.setState({
          papers: getAllPapersByTopicID,
          count: 1,
          disablePaper: false,
        });
      }
    }
  }

  async handleDelete() {
    await this.props.DELETE_ACTIVITY_MUTATION({
      variables: {
        id: this.props.event.id,
      },
      refetchQueries: [
        {
          query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
        },
      ],
    });
    this.showAlertSuccess();
  }

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    const { rooms, topics } = this.props;
    const { loading } = this.props.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY;
    if (loading) {
      return <Loading />;
    }
    // eslint-disable-next-line
    if (this.state.papers.length === 0 && this.state.count == 0) {
      const {
        getAllPapersByTopicID,
      } = this.props.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY;
      const papers = getAllPapersByTopicID;
      this.state = {
        papers: papers,
      };
    }
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        type="submit"
        onClick={() => {
          this.handleDelete();
          this.props.setToggle();
        }}
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={() => {
          this.props.setToggle();
        }}
      />,
    ];
    return (
      <form className="form conference-info m-auto" onSubmit={handleSubmit}>
        <div className="d-flex align-items-baseline">
          <Subheader className="subtitle">Edit Activity Information</Subheader>
          <RaisedButton
            className="marginLeft"
            label="Delete"
            secondary={true}
            onClick={() => {
              this.props.setToggle();
            }}
          />
        </div>

        {error && <div className="error">{error}</div>}
        <div className="d-flex form-group">
          <label>Topic :</label>
          <Field
            name="topic"
            component={renderSelectField}
            hintText="Activity Topic"
            fullWidth={true}
            onChange={(event, value) => this.handleChangeTopic(event, value)}
          >
            {topics.map(topic => {
              return (
                <MenuItem
                  key={topic.id}
                  value={topic.id}
                  primaryText={topic.name}
                />
              );
            })}
          </Field>
        </div>
        <div className="d-flex form-group">
          <label>Paper :</label>
          <Field
            name="paper"
            component={renderSelectField}
            hintText="Activity Paper"
            fullWidth={true}
            disabled={this.state.disablePaper}
          >
            {this.state.papers.map(data => {
              const paper = data.paper;
              return (
                <MenuItem
                  key={paper.id}
                  value={paper.id}
                  primaryText={paper.title}
                />
              );
            })}
          </Field>
        </div>

        <div className="d-flex form-group">
          <FieldArray
            name="schedules"
            component={renderSchedulesEdit}
            event={this.props.event}
            rooms={rooms}
          />
        </div>
        <div className="d-flex form-group">
          <Field name="error" component="label" />
        </div>
        <div className="marginBottom d-flex justify-content-flex-end">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />

          <RaisedButton
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            className="marginLeft"
          />
        </div>
        <Dialog
          title={'Do you want to delete this activity?'}
          actions={actionDelete}
          open={this.props.openDeleteFormModal}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </form>
    );
  }
}
EditActivityPaper = reduxForm({
  form: 'editActivityPaper',
  validate,
})(EditActivityPaper);

const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
    setToggle: () => dispatch(scheduleActions.toggleDeleteActivity()),
  };
};
const mapStateToProps = state => {
  return {
    openDeleteFormModal: state.schedule.openDeleteFormModal,
  };
};
export default compose(
  withApollo,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY, {
    options: ownProps => ({
      variables: {
        topic_id: ownProps.topic_id,
      },
    }),
    name: 'GET_ALL_PAPERS_BY_TOPIC_ID_QUERY',
  }),
  graphql(mutations.DELETE_ACTIVITY_MUTATION, {
    name: 'DELETE_ACTIVITY_MUTATION',
  }),
)(EditActivityPaper);
