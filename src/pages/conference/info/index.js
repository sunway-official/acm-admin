import React, { Component } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import CoOrganizerList from './coOrganizer/coOrganizerList';
import showResults from './showResults';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.handleABC = this.handleABC.bind(this);
  }
  handleABC() {}
  render() {
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
          <Tabs style={{ width: '100%' }}>
            <Tab label="Basic Information">
              <ConferenceInfo onSubmit={showResults} />
            </Tab>
            <Tab label="Co-Organizer">
              <CoOrganizerList />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
