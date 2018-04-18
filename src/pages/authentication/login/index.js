import React, { PureComponent } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
import { alertOptions, MyExclamationTriangle } from '../../../theme/alert';
import LoginForm from './LoginForm';
import './style.css';
import AlertContainer from 'react-alert';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.showAlertError = this.showAlertError.bind(this);
  }
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  async onLogin({ email, password }) {
    try {
      const {
        data: { login: { token, refreshToken } },
      } = await this.props.loginMutation({
        variables: { email, username: email, password },
      });
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.replace('/');
    } catch (error) {
      this.showAlertError(error.graphQLErrors[0].message);
      throw new SubmissionError({
        _error: 'Wrong email or password',
      });
    }
  }
  render() {
    return (
      <div className="login-body">
        <div className="login-card" id="login-form-container">
          <div className="card-content">
            <AppBar
              className="login-title"
              title="SIGN IN"
              showMenuIconButton={false}
            />
            <LoginForm onSubmit={this.onLogin} />
            <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
            <div className="final-row">
              <a className="forgot-password" href="/forgot">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $username: String!
    $password: String!
  ) {
    login(email: $email, username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

export default compose(
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
  withRouter,
)(Login);

// <a className="register" href="/register">
// Register
// </a>
