import React, { PureComponent } from 'react';
import {
  INSERT_ADDRESS_MUTATION,
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  INSERT_CONFERENCE_ATTENDEE_MUTATION,
} from '../helpers/mutations';
import { ME_QUERY, GET_ALL_CATEGORIES } from '../helpers/queries';
import Form from './addconferenceform';
import { conferenceOperations } from 'store/ducks/conference';
import { connect } from 'react-redux';
import { graphql, compose, gql } from 'react-apollo';
import '../style.scss';
import { Link } from 'react-router-dom';
import { IconButton, Subheader } from 'material-ui';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import DashboardMenu from './menu';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import { withRouter } from 'react-router';
class ConferenceAddForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleAddConference = this.handleAddConference.bind(this);

    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);
  }
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.push('/conference/info');
      },
    });
  };
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  async handleAddConference(values) {
    const user_id = this.props.data.me.id;
    try {
      if (!this.props.position) {
        this.showAlertError('Please set place on map');
      }
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
          category_id: values.category_id,
          start_date: values.start_date,
          end_date: values.end_date,
          bg_image: 'Background image',
          dl_submit_abstract: values.dl_submit_abstract,
          dl_review_abstract: values.dl_review_abstract,
          dl_release_abstract: values.dl_release_abstract,
          dl_re_submit_abstract: values.dl_re_submit_abstract,
          dl_re_review_abstract: values.dl_re_review_abstract,
          dl_release_final_abstract: values.dl_release_final_abstract,
          dl_submit_paper: values.dl_submit_paper,
          dl_review_paper: values.dl_review_paper,
          dl_release_paper: values.dl_release_paper,
          dl_re_submit_paper: values.dl_re_submit_paper,
          dl_re_review_paper: values.dl_re_review_paper,
          dl_release_final_paper: values.dl_release_final_paper,
          dl_registration: values.dl_registration,
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
      this.showAlertSuccess();
    } catch (error) {
      console.log(error);
    }
  }

  onMapPositionChanged(position) {
    this.props.getPosition(position);
    console.log(this.props);
  }

  render() {
    const { loading, getAllCategories } = this.props.GET_ALL_CATEGORIES;
    if (loading) {
      return <div>Loading...</div>;
    }
    const categories = getAllCategories;
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
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Create Conference</span>
        </div>
        <Form
          categories={categories}
          onSubmit={this.handleAddConference}
          onMapPositionChanged={this.onMapPositionChanged}
          handleSwitch={this.handleSwitch}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(GET_ALL_CATEGORIES, {
    name: 'GET_ALL_CATEGORIES',
  }),
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
