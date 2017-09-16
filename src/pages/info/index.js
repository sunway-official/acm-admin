import React, { Component } from 'react';
import { images } from '../../theme';
import style from './style.css';

class Index extends Component {
  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    );
  }
}
export default Index;
