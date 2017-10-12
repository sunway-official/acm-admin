import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import EditablePersonalInfo from '../personalInfo';
//import CardExampleWithAvatar from './changeAvatar/index';
import ChangePassword from '../changePassword';
import ContactInformation from '../contactInformation';
import '../style.css';
//import FeaturesSetting from './featuresSetting';

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

export default class InfoTabs extends React.Component {
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
            <EditablePersonalInfo me={me} />
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
