import React, { Component } from 'react';
import { queries } from '../helpers';
import { graphql } from 'react-apollo';
class AllTopics extends Component {
  render() {
    const { loading, getAllTopics } = this.props.GET_ALL_TOPICS;
    if (loading) {
      return <div>Loading...</div>;
    }
    let allTopics;
    if (getAllTopics) {
      allTopics = getAllTopics;
    }
    return (
      <div>
        {allTopics.map(topic => {
          return <div>{topic.name}</div>;
        })}
      </div>
    );
  }
}

export default graphql(queries.GET_ALL_TOPICS, {
  name: 'GET_ALL_TOPICS',
})(AllTopics);
