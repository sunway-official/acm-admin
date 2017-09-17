import React, { Component } from 'react';
import style from './style.css';

class Index extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div>Info page</div>
      </div>
    );
  }
}
export default Index;
