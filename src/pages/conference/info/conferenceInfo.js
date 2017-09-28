import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { style } from './style.css';
// import CoOrganizer from './coOrganizerInfo';
// import Organizer from './organizerInfo';
import BasicInfo from './basicInfo';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

class Info extends Component {
  constructor() {
    super();
    this.saveConference = this.saveConference.bind(this);
  }

  saveConference() {
    const { mutate, id, title, description, startDate, endDate } = this.props;
    console.log(startDate);
    console.log(endDate);
    mutate({
      variables: {
        id: id,
        title: title,
        description: description,
        start_date: startDate,
        end_date: endDate,
      },
    });
    // console.log(this.props);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <BasicInfo />
            {/* <Organizer />
            <CoOrganizer /> */}
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting}
                onClick={this.saveConference}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// const minDate = new Date();

Info = reduxForm({
  form: 'conferenceInfo',
})(Info);

const mapStateToProps = (state, ownProps) => {
  const conference = ownProps.conference;
  // const organizerDetail = conference.organizerDetail;
  return {
    id: state.conference.id,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),
      // organizerName: organizerDetail.name,
      // organizerEmail: organizerDetail.email,
      // organizerWebsite: organizerDetail.website,
      // organizerPhoneNumber: organizerDetail.phone,
    },
  };
};

const selector = formValueSelector('conferenceInfo'); // <-- same as form name
Info = connect(state => {
  // can select values individually
  const title = selector(state, 'title');
  const description = selector(state, 'description');
  const startDate = selector(state, 'startDate');
  const endDate = selector(state, 'endDate');
  return {
    title,
    description,
    startDate,
    endDate,
  };
})(Info);

const UPDATE_CONFERENCE = gql`
  mutation UpdateConference(
    $id: ID!
    $title: String!
    $description: String!
    $start_date: Date!
    $end_date: Date!
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      title
      description
      start_date
      end_date
    }
  }
`;

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_CONFERENCE),
)(Info);
