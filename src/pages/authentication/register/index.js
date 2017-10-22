import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { gql, graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
import RegisterForm from './RegisterForm';

import './style.css';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
  }
  async onRegister(values) {
    const { firstname, lastname, email, password } = values;
    try {
      await this.props.registerMutation({
        variables: { firstname, lastname, email, password },
      });

      this.props.history.goBack();
    } catch (e) {
      console.error(e);
      throw new SubmissionError({
        _error: 'Failed to register, please try again later',
      });
    }
  }
  render() {
    return (
      <div className="register-body">
        <div className="card" id="register-form-container">
          <div className="card-content">
            <AppBar
              className="register-title"
              title="REGISTER"
              showMenuIconButton={false}
            />
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
