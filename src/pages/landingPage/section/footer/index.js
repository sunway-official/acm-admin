import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import { graphql } from 'react-apollo';
import { queries } from '../../helpers';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import Loading from 'components/render/renderLoading';

class Footer extends Component {
  render() {
    const { loading, getLandingPageByConferenceId } = this.props.data;

    if (loading) return <Loading />;
    const landingPage = getLandingPageByConferenceId;
    return (
      <div id="landingpage-footer">
        <Grid fluid>
          <Row>
            <Col xs={4}>
              <h1 className="footer-logo">ACM</h1>
            </Col>
            <Col xs={4}>
              <h3 className="footer-title">Contact Us</h3>
              <p className="footer-text">
                Phone: <span /> {landingPage.phone_number}
              </p>
              <p className="footer-text">
                Email: <span /> {landingPage.email}
              </p>
            </Col>
            <Col xs={4}>
              <h3 className="footer-title">Connect With Us</h3>
              <div className="icon-cover">
                <a href={landingPage.facebook_id}>
                  <FaFacebookSquare
                    className="fa fa-facebook-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
                <a href={landingPage.twitter_id}>
                  <FaTwitterSquare
                    className="fa fa-twitter-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
                <a href={landingPage.linkedin_id}>
                  <FaLinkedinSquare
                    className="fa fa-linkedin-square fa-lg footer-icon"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default graphql(queries.GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY, {
  options: ownProps => ({
    variables: {
      conference_id: ownProps.conference_id,
    },
  }),
})(Footer);
