import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import PersonalInfo from './personal-info/index';
import CardExampleWithAvatar from './changeAvatar/index';
import ChangePassword from './changePassword';
import './style.css';
import FeaturesSetting from './featuresSetting';

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

export default class TabsExampleSwipeable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = value => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Personal Info" value={0} />
          <Tab label="Change Avatar" value={1} />
          <Tab label="Change Password" value={2} />
          <Tab label="Features Setting" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <PersonalInfo />
          </div>
          <div style={styles.slide} className="personalInfoTab">
            <CardExampleWithAvatar />
          </div>
          <div style={styles.slide} className="personalInfoTab">
            <ChangePassword />
          </div>
          <div style={styles.slide}>
            <FeaturesSetting />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
