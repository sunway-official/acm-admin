import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import './style.css';
import EditUserAvatar from '../changeAvatar/editUserAvatar';
import GeneralInfo from '../generalInfo';
import InfoTab from '../userInfo/tab';

export default class TestFlexBox extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Subheader className="subheader"> User Info</Subheader>
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
            <span>User Info</span>
          </div>
          <Row className="container">
            <Col xs={3} className="leftDiv">
              <Row>
                <EditUserAvatar />
              </Row>
              <Row>
                <GeneralInfo />
              </Row>
            </Col>
            <Col xs={9}>
              <Row>
                <InfoTab />
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
