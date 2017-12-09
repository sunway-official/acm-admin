import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, MenuItem, Subheader } from 'material-ui';
import { renderSchedulesEdit, renderSelectField } from '../../render';
import { Link } from 'react-router-dom';
import { queries } from '../../helpers';
import { compose, withApollo, graphql } from 'react-apollo';
import { scheduleOperations } from 'store/ducks/schedule';
import { connect } from 'react-redux';
import validate from '../../validate';

class EditActivityPaper extends Component {
  constructor() {
    super();
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
    this.state = {
      papers: [],
    };
  }

  async handleChangeTopic(event, value) {
    const papers = await this.props.client.query({
      query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
      variables: {
        topic_id: value,
      },
    });
    const { loading, getAllPapersByTopicID } = papers.data;
    if (!loading) {
      console.log(getAllPapersByTopicID);
      this.setState({
        papers: getAllPapersByTopicID,
      });
    }
  }

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    const { rooms, topics } = this.props;
    const { loading } = this.props.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (this.state.papers.length === 0) {
      const {
        getAllPapersByTopicID,
      } = this.props.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY;
      const papers = getAllPapersByTopicID;
      this.state = {
        papers: papers,
      };
    }
    return (
      <form className="form conference-info " onSubmit={handleSubmit}>
        <Subheader className="subheader">Edit Activity Information</Subheader>

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
        <div className="d-flex justify-content-flex-end">
          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            disabled={pristine || submitting}
          />
          <RaisedButton
            label="Cancel"
            containerElement={<Link to="/conference/activities" />}
            style={{ marginLeft: '10px' }}
          />
        </div>
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
  };
};

export default compose(
  withApollo,
  connect(undefined, mapDispatchToProps),
  graphql(queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY, {
    options: ownProps => ({
      variables: {
        topic_id: ownProps.topic_id,
      },
    }),
    name: 'GET_ALL_PAPERS_BY_TOPIC_ID_QUERY',
  }),
)(EditActivityPaper);
