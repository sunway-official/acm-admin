import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { gql, graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';

import RegisterForm from './RegisterForm';

import './style.css';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
  }
  async onRegister({ firstname, lastname, email, password }) {
    try {
      await this.props.registerMutation({
        variables: { firstname, lastname, email, password },
      });

      this.props.history.go('/login');
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
      <div className="register-body">
        <div className="card" id="form-container">
          <div className="card-content">
            <h1 id="register-title">Register</h1>
            <RegisterForm onSubmit={this.onRegister} />
          </div>
        </div>
      </div>
    );
  }
}

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

export default compose(
  graphql(REGISTER_MUTATION, { name: 'registerMutation' }),
  withRouter,
)(Register);
