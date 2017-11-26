import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { withRouter } from 'react-router';
import Form from './form';
class Index extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  async handleAdd({ title, abstract }) {
    try {
      await this.props.INSERT_PAPER({
        variables: {
          title: title,
          abstract: abstract,
        },
        refetchQueries: [
          {
            query: queries.GET_ALL_PAPERS,
          },
        ],
      });
      this.props.history.replace('/conference/papers');
    } catch (error) {
      throw error;
    }
  }
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader">Papers Management</Subheader>
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
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Add New Paper</span>
        </div>
        <div className="dashboard content d-flex">
          <Form onSubmit={this.handleAdd} />
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(mutations.INSERT_PAPER, {
    name: 'INSERT_PAPER',
  }),
)(Index);
