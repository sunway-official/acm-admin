import React from 'react';
import { Tabs, Tab } from 'material-ui';
import BasicInfo from './basicInfo';
import OrganizerInfo from './organizerInfo';

const TabInfo = () => (
  <Tabs>
    <Tab label="Basic Information">
      <BasicInfo />
    </Tab>
    <Tab label="Organizer Information">
      <OrganizerInfo />
    </Tab>
  </Tabs>
);

export default TabInfo;
