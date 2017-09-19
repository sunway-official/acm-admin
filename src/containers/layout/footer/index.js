import React, { Component } from 'react';
import { style } from './style.css';

export default class Index extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />;
        <div className="footer">This is footer</div>
      </div>
    );
  }
}
