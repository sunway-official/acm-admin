import React, { Component } from 'react';
import FaStar from 'react-icons/lib/fa/star';
import Rating from 'react-rating';

const style = {
  marginTop: '150px',
};

class ReactRating extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(rate) {
    alert(rate);
  }

  render() {
    return (
      <div style={style}>
        <Rating
          fractions={2}
          onChange={this.onChange}
          emptySymbol={<FaStar size={40} style={{ color: '#95a5a6' }} />}
          fullSymbol={<FaStar size={40} style={{ color: '#f1c40f' }} />}
        />
      </div>
    );
  }
}

export default ReactRating;
