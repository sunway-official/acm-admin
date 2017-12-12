import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql } from 'react-apollo';
import { queries } from './helpers';
import TopicList from './topicList';
import Loading from '../../../components/render/renderLoading';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }
  render() {
    const {
      loading,
      getTopicsOfConference,
    } = this.props.GET_TOPICS_OF_CONFERENCE_QUERY;
    if (loading) return <Loading />;
    const listTopic = getTopicsOfConference;
    return (
      <div className="conference">
        <Subheader className="subheader"> Topics Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Topics Management</span>
        </div>
        <div className="dashboard content d-flex">
          <TopicList listTopic={listTopic} />
        </div>
      </div>
    );
  }
}

export default graphql(queries.GET_TOPICS_OF_CONFERENCE_QUERY, {
  name: 'GET_TOPICS_OF_CONFERENCE_QUERY',
})(Index);
