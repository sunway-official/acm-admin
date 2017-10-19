import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import EditablePersonalInfo from '../personalInfo';
import ChangePassword from '../changePassword';
import ContactInformation from '../contactInformation';
import '../style.css';
import { queries } from '../helpers';
import { compose, gql, graphql } from 'react-apollo';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class InfoTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.saveInfomation = this.saveInfomation.bind(this);
  }
  handleChange = value => {
    this.setState({
      slideIndex: value,
    });
  };
  saveInfomation(values) {
    const { UPDATE_ME_MUTATION } = this.props;
    UPDATE_ME_MUTATION({
      variables: {
        firstname: values.firstname,
        lastname: values.lastname,
        gender: values.gender,
        dob: values.dob,
        bio: values.bio,
        position: values.position,
        organization: values.organization,
      },
      refetchQueries: [
        {
          query: queries.ME_QUERY,
        },
      ],
    });
    window.alert('Update successful!');
  }
  render() {
    const me = this.props.me;
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Personal Info" value={0} />
          <Tab label="Contact Information" value={1} />
          <Tab label="Change Password" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <EditablePersonalInfo me={me} onSubmit={this.saveInfomation} />
          </div>
          <div>
            <ContactInformation me={me} />
          </div>
          <div style={styles.slide}>
            <ChangePassword />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String!
    $lastname: String!
    $dob: Date
    $gender: Gender!
    $bio: String
    $organization: String
    $position: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      dob: $dob
      gender: $gender
      bio: $bio
      position: $position
      organization: $organization
    ) {
      firstname
      lastname
      dob
      gender
      bio
      position
      organization
    }
  }
`;
export default compose(
  graphql(UPDATE_ME_MUTATION, {
    name: 'UPDATE_ME_MUTATION',
  }),
  graphql(queries.ME_QUERY, {
    name: 'ME_QUERY',
  }),
)(InfoTabs);
