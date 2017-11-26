import React, { PureComponent } from 'react';
import {
  INSERT_ADDRESS_MUTATION,
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  ME_QUERY,
} from '../helpers/mutations';
import { graphql, compose } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import AddForm from './addconferenceform';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';
import '../style.scss';
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
    console.log('data', values);
    console.log('props', this.props);
    const user_id = this.props.data.me.id;

    try {
      await this.propsINSERT_ADDRESS_MUTATION({
        variables: {
          street: '',
          city: '',
          country: '',
          lat: 16.0598934,
          long: 108.2076032,
        },
      });
      await this.props.INSERT_ORGANIZER_DETAIL_MUTATION({
        variables: {
          user_id: user_id,
          name: values.organizerName,
          email: values.organizerEmail,
          website: values.organizerWebsite,
          phone: values.organizerPhoneNumber,
        },
      });
      await this.props.INSERT_CONFERENCE_MUTATION({
        variables: {
          organizer_detail_id: this.props.data.insertOrganizerDetail.id,
          address_id: this.props.data.insertOrganizerDetail.id,
          title: values.title,
          description: values.description,
          start_date: values.startDate,
          end_date: values.endDate,
          bg_image: 'Background image',
        },
      });
    } catch (error) {
      throw new SubmissionError(error);
    }
  }

  onMapPositionChanged(position) {
    this.props.getPosition(position);

    console.log(this.props);
  }

  render() {
    return (
      <AddForm
        onSubmit={this.handleAddConference}
        handleClose={this.handleClose}
        onMapPositionChanged={this.onMapPositionChanged}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPosition(new_position) {
    dispatch(conferenceOperations.getPositionOperation(new_position));
  },
});

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(INSERT_CONFERENCE_MUTATION, {
    name: 'INSERT_CONFERENCE_MUTATION',
  }),
  graphql(INSERT_ORGANIZER_DETAIL_MUTATION, {
    name: 'INSERT_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(INSERT_ADDRESS_MUTATION, {
    name: 'INSERT_ADDRESS_MUTATION',
  }),
  graphql(ME_QUERY),
)(ConferenceAddForm);
