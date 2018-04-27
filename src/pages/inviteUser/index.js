import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import Form from './Form';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { mutations } from './helpers';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  async handleSubmit(values) {
    const { INVITE_USER } = this.props;
    try {
      await INVITE_USER({
        variables: {
          role_id: values.role_id,
          email: values.email,
          title: values.title,
          firstname: values.firstname,
          lastname: values.lastname,
        },
      });
      this.showAlertSuccess();
    } catch (error) {
      console.log(error);
    }
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
          <span>Author/Reviewer Invitation</span>
        </div>
        <div className="dashboard content d-flex justify-content-center">
          <Form onSubmit={this.handleSubmit} />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state.auth.currentUser.currentConference) {
    return {
      conference_id: state.auth.currentUser.currentConference.id,
    };
  }
};
export default compose(
  graphql(mutations.INVITE_USER, {
    name: 'INVITE_USER',
  }),
  connect(mapStateToProps, undefined),
)(Index);
