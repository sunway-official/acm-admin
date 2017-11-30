import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { queries } from '../helpers';
import Form from './form';
class Index extends Component {
  render() {
    //console.log(this.props);
    const { loading, getPaperByID } = this.props.data;
    if (loading) return <div>Loading...</div>;
    let paper;
    if (getPaperByID) {
      paper = getPaperByID;
    }
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
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
          <span>Paper Management</span>
        </div>
        <div className="dashboard content d-flex">
          <Form paper={paper} />
        </div>
      </div>
    );
  }
}

export default graphql(queries.GET_PAPER_BY_ID, {
  options: ownProps => ({
    name: 'GET_PAPER_BY_ID',
    variables: {
      id: ownProps.match.params.id,
    },
  }),
})(Index);