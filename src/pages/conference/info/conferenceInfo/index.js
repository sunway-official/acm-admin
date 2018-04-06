import React, { PureComponent } from 'react';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import InfoForm from './InfoForm';
import { withRouter } from 'react-router-dom';
import './style.css';
import { conferenceOperations } from 'store/ducks/conference';
import ViewInfoForm from './ViewInfoForm';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';

class ConferenceInfoForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleUpdateConferenceInfo = this.handleUpdateConferenceInfo.bind(
      this,
    );
    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);

    this.state = {
      position: {
        lat: this.props.conference.address.lat,
        long: this.props.conference.address.long,
      },
    };
  }

  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };

  async handleUpdateConferenceInfo({
    title,
    description,
    startDate,
    endDate,
    organizerName,
    organizerEmail,
    organizerWebsite,
    organizerPhoneNumber,
    organizerAddress,
  }) {
    try {
      const conference = await this.props.UPDATE_CONFERENCE_MUTATION({
        variables: {
          id: this.props.conference_id,
          title: title,
          description: description,
          start_date: startDate,
          end_date: endDate,
        },
      });
      const organizer = await this.props.UPDATE_ORGANIZER_DETAIL_MUTATION({
        variables: {
          id: this.props.organizer_id,
          name: organizerName,
          email: organizerEmail,
          website: organizerWebsite,
          phone: organizerPhoneNumber,
          address: organizerAddress,
        },
      });
      let address;
      if (this.props.position) {
        address = await this.props.UPDATE_ADDRESS_MUTATION({
          variables: {
            id: this.props.address_id,
            lat: this.props.position.lat,
            long: this.props.position.lng,
          },
        });
      }
      if (conference || organizer || address) {
        this.showAlertSuccess();
      }
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp);
    }
  }
  onMapPositionChanged(position) {
    this.props.getPosition(position);
  }
  render() {
    if (this.props.isShow['edit-conference-info']) {
      return (
        <div>
          <InfoForm
            initialValues={this.props.initialValues}
            conference={this.props.conference}
            onSubmit={this.handleUpdateConferenceInfo}
            onMapPositionChanged={this.onMapPositionChanged}
          />
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
        </div>
      );
    } else {
      return (
        <div>
          <ViewInfoForm
            initialValues={this.props.initialValues}
            conference={this.props.conference}
            onSubmit={this.handleUpdateConferenceInfo}
            onMapPositionChanged={this.onMapPositionChanged}
          />
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosition: position =>
      dispatch(conferenceOperations.getPositionOperation(position)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const conference = ownProps.conference;
  const organizer = conference.organizerDetail;
  const address = conference.address;
  return {
    address_id: address.id,
    conference_id: conference.id,
    organizer_id: organizer.id,
    position: state.conference.position,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),
      lat: parseFloat(conference.address.lat),
      long: parseFloat(conference.address.long),
      organizerAddress: organizer.address,
      organizerName: organizer.name,
      organizerEmail: organizer.email,
      organizerWebsite: organizer.website,
      organizerPhoneNumber: organizer.phone,
    },
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(queries.GET_ALL_ROLE_OF_USER, {
    name: 'GET_ALL_ROLE_OF_USER',
  }),
  graphql(mutations.UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
  graphql(mutations.UPDATE_ORGANIZER_DETAIL_MUTATION, {
    name: 'UPDATE_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(mutations.UPDATE_ADDRESS_MUTATION, {
    name: 'UPDATE_ADDRESS_MUTATION',
  }),
)(ConferenceInfoForm);
