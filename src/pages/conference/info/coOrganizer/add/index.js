import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { mutations, queries } from '../../helpers';
import Form from '../form';
import { withRouter } from 'react-router';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
class Index extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/info');
      },
    });
  };
  async handleAdd(values) {
    console.log(values);
    try {
      await this.props.INSERT_COORGANIZER({
        variables: {
          address: '',
          id: this.props.coOrganizerId,
          name: values.coOrganizerName,
          email: values.coOrganizerEmail,
          website: values.coOrganizerWebsite,
          phone: values.coOrganizerPhone,
        },
        refetchQueries: [
          {
            query: queries.GET_CURRENT_CONFERENCE,
          },
        ],
      });
      this.showAlertSuccess();
    } catch (error) {
      throw console.log(error);
    }
  }
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">Co-Organizer Management</Subheader>
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
          <Link to="/conference/info">
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Co-Organizer Management</span>
        </div>
        <div className="dashboard content d-flex justify-content-center">
          <Form onSubmit={this.handleAdd} />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(mutations.INSERT_COORGANIZER, {
    name: 'INSERT_COORGANIZER',
  }),
)(Index);
