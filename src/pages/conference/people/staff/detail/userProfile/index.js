import React, { Component } from 'react';
import InfoTabs from './tab';
import GeneralInfo from '../generalInfo';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import EditUserAvatar from '../changeAvatar/editUserAvatar';
import { graphql, gql } from 'react-apollo';

class Index extends Component {
  render() {
    const { loading } = this.props.data;
    if (loading) return <div>Loading...</div>;
    const me = this.props.data.me;
    //console.log(this.props.data.me);
    return (
      <div className="conference">
        <Subheader className="subheader"> User Profile</Subheader>
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
          <span>User Profile</span>
        </div>
        <div className="dashboard content d-flex">
          <div className="contain">
            <div className="form-container">
              <div className="left-div">
                <div className="card" id="left-form-container">
                  <div className="card-content">
                    <EditUserAvatar />
                    <GeneralInfo me={me} />
                  </div>
                </div>
              </div>
              <div className="right-div">
                <div className="card" id="right-form-container">
                  <div className="card-content">
                    <InfoTabs me={me}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const QUERY_ME = gql`
  query Me {
    me {
      firstname
      lastname
      gender
      email
      bio
      dob
      linkedin_id
      facebook_id
      twitter_id
    }
  }
`;

export default graphql(QUERY_ME)(Index);
