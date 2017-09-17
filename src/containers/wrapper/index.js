import React, { Component } from 'react';
import AppBar from '../layout/appbar';
import Footer from '../layout/footer';

class Index extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <div className="dashboard">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Index;
