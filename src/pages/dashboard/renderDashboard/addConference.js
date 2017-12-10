import React, { PureComponent } from 'react';
import {
  INSERT_ADDRESS_MUTATION,
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  ME_QUERY,
  INSERT_CONFERENCE_ATTENDEE_MUTATION,
} from '../helpers/mutations';
import { SubmissionError } from 'redux-form';
import AddForm from './addconferenceform';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';
import { graphql, compose, gql } from 'react-apollo';
import '../style.scss';
import { Link } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { ActionHome } from 'material-ui/svg-icons';
import { Subheader } from 'material-ui';
import DashboardMenu from './menu';
class ConferenceAddForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleAddConference = this.handleAddConference.bind(this);

    this.state = {
      position: {
        lat: 16.0598934,
        long: 108.2076032,
      },
    };
    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);
  }

  async handleAddConference(values) {
    const user_id = this.props.data.me.id;
    try {
      const addressData = await this.props.INSERT_ADDRESS_MUTATION({
        variables: {
          street: '',
          city: '',
          country: '',
          lat: this.props.position.lat,
          long: this.props.position.lng,
        },
      });
      const organizeDetailData = await this.props.INSERT_ORGANIZER_DETAIL_MUTATION(
        {
          variables: {
            user_id: user_id,
            name: values.organizerName,
            email: values.organizerEmail,
            address: values.organizerAddress,
            website: values.organizerWebsite,
            phone: values.organizerPhoneNumber,
          },
        },
      );
      const conference = await this.props.INSERT_CONFERENCE_MUTATION({
        variables: {
          organizer_detail_id: organizeDetailData.data.insertOrganizerDetail.id,
          address_id: addressData.data.insertAddress.id,
          title: values.title,
          description: values.description,
          start_date: values.startDate,
          end_date: values.endDate,
          bg_image: 'Background image',
        },
      });
      console.log(conference);
      await this.props.INSERT_CONFERENCE_ATTENDEE_MUTATION({
        variables: {
          conference_id: conference.data.insertConference.id,
          user_id: user_id,
        },
      });
      await this.props.SWITCH_CURRENT_CONFERENCE({
        variables: {
          conference_id: conference.data.insertConference.id,
        },
        refetchQueries: [
          {
            query: ME_QUERY,
          },
        ],
      });
      window.location.replace('/conference/info');
    } catch (error) {
      console.log(error);
      throw new SubmissionError(error);
    }
  }

  onMapPositionChanged(position) {
    this.props.getPosition(position);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <DashboardMenu />
        <Subheader className="subheader conf-infor-title">
          Create Conference
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="add-form-bg">
          <AddForm
            onSubmit={this.handleAddConference}
            onMapPositionChanged={this.onMapPositionChanged}
            handleSwitch={this.handleSwitch}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    position: state.conference.position,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosition: position =>
      dispatch(conferenceOperations.getPositionOperation(position)),
  };
};

export const SWITCH_CURRENT_CONFERENCE = gql`
  mutation switchCurrentConference($conference_id: ID!) {
    switchCurrentConference(conference_id: $conference_id) {
      id
    }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(INSERT_CONFERENCE_MUTATION, {
    name: 'INSERT_CONFERENCE_MUTATION',
  }),
  graphql(INSERT_ORGANIZER_DETAIL_MUTATION, {
    name: 'INSERT_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(INSERT_ADDRESS_MUTATION, {
    name: 'INSERT_ADDRESS_MUTATION',
  }),
  graphql(INSERT_CONFERENCE_ATTENDEE_MUTATION, {
    name: 'INSERT_CONFERENCE_ATTENDEE_MUTATION',
  }),
  graphql(SWITCH_CURRENT_CONFERENCE, {
    name: 'SWITCH_CURRENT_CONFERENCE',
  }),
  graphql(ME_QUERY),
)(ConferenceAddForm);
