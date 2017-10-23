import React from 'react';
import { Component } from 'react';
//import Script from 'react-load-script';
import './css/component.css';
import './css/default.css';
import { images } from '../theme';
import Register from './section/register';
import Description from './section/description';
import Paper from './section/paper';

class LandingPage extends Component {
  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }
  render() {
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <div className="cbp-af-inner">
              <h2>ACM</h2>
              <nav>
                <a href="" className="home">
                  Home
                </a>
                <a href="">Speaker</a>
                <a href="">Paper</a>
                <a href="">Contact Us</a>
                <button className="btn get-ticket">Get Ticket</button>
              </nav>
            </div>
          </div>
          <div className="main">
            <div>
              <img
                src={images.conference1}
                className="img conference1"
                alt=""
              />
            </div>
            <Register />
            <Description />
            <Paper />
          </div>
        </div>
        {/*<Script
          url="./cbpAnimatedHeader.min.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Script
          url="./classie.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />*/}
      </div>
    );
  }
}
export default LandingPage;
