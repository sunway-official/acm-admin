import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import Footer from '../section/footer';
import Header from '../section/header';
import Papers from './paperList';
import Loading from 'components/render/renderLoading';
class PaperList extends Component {
  render() {
    const loadingTopic = this.props.GET_TOPICS_OF_CONFERENCE_QUERY.loading;
    const loadingConference = this.props.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY
      .loading;
    if (loadingTopic || loadingConference) return <Loading />;
    const deadlinePaper = this.props.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY
      .getLandingPageByConferenceId.conference.dl_release_final_paper;
    const getTopicsOfConference = this.props.GET_TOPICS_OF_CONFERENCE_QUERY
      .getTopicsOfConference;
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <Header conference_id={this.props.match.params.conference_id} />
          </div>
          <div className="main">
            <Papers
              papers={getTopicsOfConference}
              deadlinePaper={deadlinePaper}
            />
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
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: {
        conference_id: ownProps.match.params.conference_id,
      },
    }),
    name: 'GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY',
  }),
)(PaperList);
