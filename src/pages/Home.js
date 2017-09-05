import React, { Component } from 'react';
import style from './style.scss';

class Home extends Component {
  render() {
    return (
      <div className="ab">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Home;
