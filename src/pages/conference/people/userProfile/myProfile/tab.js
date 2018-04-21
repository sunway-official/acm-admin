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
import {
  alertOptions,
  MyExclamationTriangle,
  MyFaCheck,
} from '../../../../../theme/alert';
import AlertContainer from 'react-alert';

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
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  handleChange = value => {
    this.setState({
      slideIndex: value,
    });
  };
  async saveInformation(values) {
    const { UPDATE_ME_MUTATION } = this.props;
    try {
      await UPDATE_ME_MUTATION({
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
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }
  async savePassword(values) {
    const { UPDATE_PASSWORD_MUTATION } = this.props;
    try {
      await UPDATE_PASSWORD_MUTATION({
        variables: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });
      this.showAlertSuccess();
    } catch (error) {
      //console.log('abc');
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
      console.log(error.graphQLErrors[0].message);
    }
  }
  render() {
    const me = this.props.me;
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Personal Info" value={0} />
          <Tab label="Contact Information" value={1} />
          {this.props.disabled ? (
            ''
          ) : (
            <Tab
              label="Change Password"
              value={2}
              disabled={this.props.disabled}
            />
          )}
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <EditablePersonalInfo
              me={me}
              disabled={this.props.disabled}
              onSubmit={this.saveInformation}
            />
          </div>
          <div>
            <ContactInformation
              me={me}
              disabled={this.props.disabled}
              onSubmit={this.saveInformation}
            />
          </div>
          <div style={styles.slide}>
            <ChangePassword onSubmit={this.savePassword} />
          </div>
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
