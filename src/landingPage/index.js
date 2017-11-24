import React from 'react';
import { Component } from 'react';
import './style.css';
import Register from './section/register';
import Description from './section/description';
import Paper from './section/paper';
import Speaker from './section/speaker/index';
import CountDownTimer from './section/countdownTimer';
import Map from './section/map';
import Footer from './section/footer';
import { graphql, compose } from 'react-apollo';
import { queries } from './helpers/index';
import Home from './section/home';
import Header from './section/header';
class LandingPage extends Component {
  render() {
    const { loading, getLandingPageByConferenceId } = this.props.data;
    if (loading) return <div>loading</div>;
    const landingPage = getLandingPageByConferenceId[0];
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <Header conference_id={this.props.match.params.conference_id} />
          </div>
          <div className="main">
            <Home landingPage={landingPage} />
            <Register landingPage={landingPage} />
            <Description landingPage={landingPage} />
            <Paper landingPage={landingPage} />
            <CountDownTimer landingPage={landingPage} />
            <Speaker landingPage={landingPage} />
            <Map landingPage={landingPage} />
            <Footer conference_id={this.props.match.params.conference_id} />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: {
        conference_id: ownProps.match.params.conference_id,
      },
    }),
  }),
)(LandingPage);
