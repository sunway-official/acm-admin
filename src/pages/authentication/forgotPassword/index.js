import React, { PureComponent } from 'react';
import { AppBar } from 'material-ui';
import { gql, graphql } from 'react-apollo';
import { alertOptions, MyFaCheck } from 'theme/alert';

import ForgotPasswordForm from './forgotForm';
import AlertContainer from 'react-alert';
import './style.css';

class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSendForgotPasswordEmail = this.handleSendForgotPasswordEmail.bind(
      this,
    );
  }
  showAlertSuccess = () => {
    this.msg.success('Success, please check you inbox.', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {},
    });
  };
  async handleSendForgotPasswordEmail({ email }) {
    await this.props.sendForgotPasswordEmail({
      variables: {
        email,
      },
    });
    this.showAlertSuccess();
  }
  render() {
    return (
      <div className="forgot-body">
        <div className="forgot-card" id="forgot-form-container">
          <div className="card-content">
            <AppBar
              className="forgot-title"
              title="FORGOT PASSWORD"
              showMenuIconButton={false}
            />
            <ForgotPasswordForm onSubmit={this.handleSendForgotPasswordEmail} />
          </div>
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email) {
      success
    }
  }
`;

export default graphql(SEND_FORGOT_PASSWORD_EMAIL, {
  name: 'sendForgotPasswordEmail',
})(ForgotPassword);
