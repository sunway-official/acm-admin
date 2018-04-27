import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { images } from '../../../../theme';

class Index extends Component {
  render() {
    return (
      <header className="landing-page-header">
        <Link
          to={`/landingpage/${this.props.conference_id}`}
          href=""
          className="logo"
        >
          <img className="logo" src={images.defaultLogo} alt="logo" />
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <ul className="menu">
          <li>
            <Link
              to={`/landingpage/${this.props.conference_id}`}
              className="active"
            >
              Home
            </Link>
          </li>
          <li>
            <a href="">Speakers</a>
          </li>
          <li>
            <Link to={`/landingpage/${this.props.conference_id}/papers`}>
              Papers
            </Link>
          </li>
          <li>
            <Link to={`/landingpage/${this.props.conference_id}/schedule`}>
              Schedules
            </Link>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </header>
    );
  }
}
export default Index;

// <div className="header">
//         <a href="" className="logo">
//           ACM
//         </a>
//         <div className="header-right">
//           <Link
//             to={`/landingpage/${this.props.conference_id}`}
//             className="active"
//           >
//             Home
//           </Link>
//           <a href="">Speaker</a>
//           <Link to={`/landingpage/${this.props.conference_id}/papers`}>
//             Papers
//           </Link>
//           <Link to={`/landingpage/${this.props.conference_id}/schedule`}>
//             Schedules
//           </Link>
//           <a href="">Contact Us</a>
//         </div>
//       </div>
