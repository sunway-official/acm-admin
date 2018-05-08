import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import Form from './Form';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';

class Index extends Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  }
  showAlertSuccess = () => {
    this.msg.success('Registed, Please check your email!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  handleSave() {
    // if (true) {
    this.showAlertSuccess();
    // }
    console.log(true);
  }

  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">
          {localStorage.getItem('conferenceTitle')}
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
          <span>Registration</span>
        </div>
        <div className="dashboard content d-flex justify-content-center">
          <Form onSubmit={this.handleSave} />
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
        </div>
      </div>
    );
  }
}
export default Index;
