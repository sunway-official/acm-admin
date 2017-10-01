import React, { PureComponent } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';
import './style.css';
import { AppBar } from 'material-ui';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }
  async onLogin({ email, password }) {
    try {
      const {
        data: { login: { token, refreshToken } },
      } = await this.props.loginMutation({
        variables: { email, password },
      });
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.replace('/');
    } catch (e) {
      console.error(e);
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
            <div className="final-row">
              <a className="forgot-password" href="/forgot">
                Forgot Password
              </a>
              <a className="register" href="/register">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export default compose(
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
  withRouter,
)(Login);
