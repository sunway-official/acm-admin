import React, { PureComponent } from 'react';
import { AppBar } from 'material-ui';
import { gql, graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.onResetPassword = this.onResetPassword.bind(this);

    this.state = {
      token: '',
    };
  }
  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    if (!token) {
      this.props.history.replace('/login');
    }

    this.setState({ token });

    try {
      await this.props.checkForgotPasswordToken({
        variables: {
          token,
        },
      });
    } catch (error) {
      console.error(error);
      // TODO: Display an error message here saying that the token is invalid!
    }
  }
  async onResetPassword({ password }) {
    try {
      await this.props.resetUserPassword({
        variables: {
          token: this.state.token,
          newPassword: password,
        },
      });

      console.log('SUCCESS!');

      this.props.history.replace('/login');
    } catch (error) {
      console.error(error);
      // TODO: Display error message here that there is somethings happened
    }
  }
  render() {
    return (
      <div className="forgot-body">
        <div className="forgot-card" id="forgot-form-container">
          <div className="card-content">
            <AppBar
              className="forgot-title"
              title="Reset Password"
              showMenuIconButton={false}
            />
            <ResetPasswordForm onSubmit={this.onResetPassword} />
          </div>
        </div>
      </div>
    );
  }
}

const CHECK_FORGOT_PW_TOKEN_MUTATION = gql`
  mutation CheckForgotPasswordToken($token: String!) {
    checkForgotPasswordToken(token: $token) {
      success
    }
  }
`;

const RESET_USER_PASSWORD_MUTATION = gql`
  mutation ResetUserPassword($token: String!, $newPassword: String!) {
    resetUserPassword(token: $token, newPassword: $newPassword) {
      success
    }
  }
`;

export default compose(
  graphql(CHECK_FORGOT_PW_TOKEN_MUTATION, { name: 'checkForgotPasswordToken' }),
  graphql(RESET_USER_PASSWORD_MUTATION, { name: 'resetUserPassword' }),
  withRouter,
)(ResetPassword);
