import React from 'react';
import { Component } from 'react';
import '../../css/speakerStyle.css';

const listImage = [
  {
    id: 1,
    src:
      'http://www.bimshowlive.co.uk/wp-content/uploads/2017/06/Elliott-Crossley.jpg',
  },
  {
    id: 2,
    src:
      'http://www.bimshowlive.co.uk/wp-content/uploads/2017/06/Stu-Maggs.jpg',
  },
  {
    id: 3,
    src:
      'http://www.bimshowlive.co.uk/wp-content/uploads/2017/06/Hadeel-Safaa-Saadoon.jpg',
  },
  {
    id: 4,
    src:
      'http://www.bimshowlive.co.uk/wp-content/uploads/2017/06/James-Pellat.jpg',
  },
  {
    id: 5,
    src:
      'http://www.bimshowlive.co.uk/wp-content/uploads/2017/06/Mark-Shayler.jpg',
  },
];
class SpeakerAvatar extends Component {
  render() {
    const content = listImage.map(image => (
      <div key={image.id} className="hover08">
        <figure>
          <img src={image.src} alt="" className="speaker-avatar" />
          <div className="speaker-info-wrapper">
            <h4> Speaker name </h4>
            <div>Speaker description</div>
          </div>
        </figure>
      </div>
    ));
    return <div className="list-image">{content}</div>;
  }
}

export default SpeakerAvatar;

// return (
//   <div className="hover08">
//     <div>
//       <figure><img src="https://nxworld.net/example/css-image-hover-effects/pic03.jpg" /></figure>
//     </div>
//   </div>
// );
