import React, { PureComponent } from 'react';
import { AppBar } from 'material-ui';
import { gql, graphql } from 'react-apollo';

import ForgotPasswordForm from './forgotForm';

import './style.css';

class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSendForgotPasswordEmail = this.handleSendForgotPasswordEmail.bind(
      this,
    );
  }
  async handleSendForgotPasswordEmail({ email }) {
    await this.props.sendForgotPasswordEmail({
      variables: {
        email,
      },
    });
    // TODO: Display message for this
    alert('Completed, create message for this!');
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
