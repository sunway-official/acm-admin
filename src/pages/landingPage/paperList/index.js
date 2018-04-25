import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import Footer from '../section/footer';
import Header from '../section/header';
import Papers from './paperList';
import Loading from 'components/render/renderLoading';
class PaperList extends Component {
  render() {
    const {
      loading,
      getTopicsOfConference,
    } = this.props.GET_TOPICS_OF_CONFERENCE_QUERY;
    if (loading) return <Loading />;
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <Header conference_id={this.props.match.params.conference_id} />
          </div>
          <div className="main">
            <Papers papers={getTopicsOfConference} />
            <Footer conference_id={this.props.match.params.conference_id} />
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(queries.GET_TOPICS_OF_CONFERENCE_QUERY, {
    name: 'GET_TOPICS_OF_CONFERENCE_QUERY',
  }),
)(PaperList);
