import React, { Component } from 'react';
import AppBar from '../appbar';
import style from './style.css';

class Home extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <AppBar />
      </div>
    );
  }
}

export default Home;
