import React, { PureComponent } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { connect } from 'react-redux';
import showResults from './showResults';
import { graphql, gql, compose } from 'react-apollo';
import { conferenceOperations } from '../../../store/ducks/conference';

class Index extends PureComponent {
  componentDidMount() {
    this.props.getConferenceId(this.props.match.params.id);
  }
  render() {
    // console.log(this.props);
    const { loading } = this.props.data;

    if (loading) return <div>loading</div>;

    const conference = this.props.data.getConferenceByID;
    // console.log(c);
    // console.log(this.props);
    return (
      <div className="conference">
        <Subheader className="subheader"> Conference Information</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Conference Information</span>
        </div>
        <div className="dashboard content d-flex">
          <ConferenceInfo conference={conference} onSubmit={showResults} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConferenceId: id => dispatch(conferenceOperations.getIdOperation(id)),
  };
};

const GET_CONFERENCE_BY_ID_QUERY = gql`
  query getConference($id: ID!) {
    getConferenceByID(id: $id) {
      id
      title
      description
      start_date
      end_date
      organizerDetail {
        name
        email
        website
        phone
      }
      coOrganizerDetails {
        name
        email
        website
        phone
      }
    }
  }
`;

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(GET_CONFERENCE_BY_ID_QUERY, {
    options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
  }),
)(Index);
