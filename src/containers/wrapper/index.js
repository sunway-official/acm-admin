import React, { Component } from 'react';
import AppBar from '../layout/appbar';
import Footer from '../layout/footer';
import style from './style.css';
import { Subheader, Divider } from 'material-ui';

class Index extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <AppBar />
        <div className="dashboard">
          <div>
            <Subheader className="header">
              <span className="subheader">Page Title</span>
            </Subheader>
            <Divider />
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
