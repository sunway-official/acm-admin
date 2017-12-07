import React from 'react';
import { Component } from 'react';
import { images } from '../../../../theme';
import './style.css';

class Home extends Component {
  render() {
    return (
      <div id="home-body">
        <img
          src={images.conference1}
          className="img landing conference1"
          alt=""
        />
        <div className="home-description">
          <h1 className="landingpage-title">
            <span className="home-title">{this.props.landingPage.slogan}</span>
          </h1>
          <h3>
            Thank you for attending {this.props.landingPage.conference.title}
          </h3>
        </div>
      </div>
    );
  }
}
export default Home;
