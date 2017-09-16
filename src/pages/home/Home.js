import React, { Component } from 'react';
import Layout from '../layout';
import Footer from '../layout/footer';
import style from './style.css';
import People from '../people';

class Home extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Layout />
        <div className="dashboard">
          <People />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
