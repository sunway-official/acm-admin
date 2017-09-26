import React, { Component } from 'react';
import AppBar from '../layout/appbar';
import style from './style.css';

class Index extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <AppBar />
        <div className="body-content">
          <div className="dashboard">
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
