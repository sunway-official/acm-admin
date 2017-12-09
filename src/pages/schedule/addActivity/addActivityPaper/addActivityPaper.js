import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { RaisedButton, MenuItem, Subheader } from 'material-ui';
import { renderSchedules, renderSelectField } from '../../render';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { scheduleOperations } from 'store/ducks/schedule';
import validate from '../../validate';
import { compose, withApollo } from 'react-apollo';
import { queries } from '../../helpers';

class AddActivityPaper extends Component {
  constructor() {
    super();
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
    this.state = {
      papers: [],
      disablePaper: true,
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
      // eslint-disable-next-line
      if (getAllPapersByTopicID.length == 0) {
        this.setState({
          papers: [],
          disablePaper: true,
        });
      } else {
        this.setState({
          papers: getAllPapersByTopicID,
          disablePaper: false,
        });
      }
    }
  }

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    const { rooms, topics } = this.props;
    const papers = this.state.papers;

    return (
      <form className="form conference-info " onSubmit={handleSubmit}>
        <Subheader className="subheader">Add Activity</Subheader>

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
            {papers.map(data => {
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
            component={renderSchedules}
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
AddActivityPaper = reduxForm({
  form: 'addActivityPaper',
  validate,
})(AddActivityPaper);

const mapDispatchToProps = dispatch => {
  return {
    checkError: error => {
      dispatch(scheduleOperations.checkErrorOperation(error));
    },
  };
};

export default compose(withApollo, connect(undefined, mapDispatchToProps))(
  AddActivityPaper,
);
