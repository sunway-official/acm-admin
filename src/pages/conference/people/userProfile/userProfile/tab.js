import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import EditablePersonalInfo from '../personalInfo';
import ChangePassword from '../changePassword';
import ContactInformation from '../contactInformation';
import '../style.css';
import { queries, mutations } from '../helpers';
import { compose, graphql } from 'react-apollo';

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
    this.saveInformation = this.saveInformation.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }
  handleChange = value => {
    this.setState({
      slideIndex: value,
    });
  };
  saveInformation(values) {
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
        linkedin_id: values.linkedin_id,
        facebook_id: values.facebook_id,
        twitter_id: values.twitter_id,
      },
      refetchQueries: [
        {
          query: queries.ME_QUERY,
        },
      ],
    });
    window.alert('Update successful!');
  }
  savePassword(values) {
    const { UPDATE_PASSWORD_MUTATION } = this.props;
    UPDATE_PASSWORD_MUTATION({
      variables: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
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
            <EditablePersonalInfo me={me} onSubmit={this.saveInformation} />
          </div>
          <div>
            <ContactInformation me={me} onSubmit={this.saveInformation} />
          </div>
          <div style={styles.slide}>
            <ChangePassword onSubmit={this.savePassword} />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default compose(
  graphql(mutations.UPDATE_ME_MUTATION, {
    name: 'UPDATE_ME_MUTATION',
  }),
  graphql(queries.ME_QUERY, {
    name: 'ME_QUERY',
  }),
  graphql(mutations.UPDATE_PASSWORD_MUTATION, {
    name: 'UPDATE_PASSWORD_MUTATION',
  }),
)(InfoTabs);
