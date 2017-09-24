import React, { PureComponent } from 'react';
import { gql, graphql } from 'react-apollo';
import { SubmissionError } from 'redux-form';
import LoginForm from './LoginForm';

import './style.css';

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
    } catch (e) {
      console.error(e);
      throw new SubmissionError({
        email: 'Wrong email or password',
        _error: 'Wrong email or password',
      });
    }
  }
  render() {
    return (
      <div className="login-body">
        <div className="card" id="form-container">
          <div className="card-content">
            <h1 id="login-title">Login</h1>
            <LoginForm onSubmit={this.onLogin} />
            <div className="final-row">
              <a className="forgot-password" href="/">
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

export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(Login);
