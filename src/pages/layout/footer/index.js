import React from 'react';
import { style } from './style.css';

const Footer = React.createClass({
  render: function() {
    <style dangerouslySetInnerHTML={{ __html: style }} />;
    return <div className="footer">This is footer</div>;
  },
});

export default Footer;
