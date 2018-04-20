import React from 'react';
import { Grid } from 'react-flexbox-grid';
import './style.css';
import AuthorInfo from './authorInfo'; // show the authors information
import PaperInfo from '../paperInfo'; // show the paper detail information
import ReviewInfo from './reviewInfo'; // show reviewer comment or select reviewer

const OrganizerDetail = props => {
  let authors = props.paper.authors;
  let paper = props.paper;
  const role = localStorage.getItem('roles');
  return (
    <Grid className="paper-detail-grid">
      <PaperInfo paper={paper} />

      {role === '1' || role === '7' ? (
        <div>
          <AuthorInfo authors={authors} />
          <ReviewInfo
            conferenceReviewer={props.conferenceReviewer}
            paper={paper}
          />
        </div>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default OrganizerDetail;
