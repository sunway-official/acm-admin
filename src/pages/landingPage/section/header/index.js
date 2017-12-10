import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
  render() {
    return (
      <div className="cbp-af-inner">
        <h2>ACM</h2>
        <nav>
          <Link
            to={`/landingpage/${this.props.conference_id}`}
            className="home"
          >
            Home
          </Link>
          <a href="">Speaker</a>
          <a href="">Paper</a>
          <Link to={`/landingpage/${this.props.conference_id}/schedule`}>
            Schedules
          </Link>
          <a href="">Contact Us</a>
          <button className="btn get-ticket">Get Ticket</button>
        </nav>
      </div>
    );
  }
}
export default Index;
