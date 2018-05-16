import React from 'react';
import * as moment from 'moment';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';

const PaperList = props => {
  const papers = props.papers;
  const noData = (
    <div className="no-data">
      The papers will be published in <span />
      {moment(props.deadlinePaper).format('DD-MM-YYYY')}
    </div>
  );
  let deadline = false;
  if (papers && papers.length > 0 && moment().isSameOrAfter()) deadline = true;
  let content;
  content = papers.map(
    topic =>
      topic.papers.length > 0 ? (
        <div key={topic.id}>
          <hr />
          <Row className="card-detail-row">
            <Col xs={3} className="landing-page-topic-title">
              {topic.name}
            </Col>
            <Col xs={9}>
              {topic.papers.map((paper, index) => (
                <Row key={paper.id}>
                  {paper.file && (
                    <span className="landing-page-paper-title">
                      {index + 1}. {paper.title} ({paper.authors[0].author_name})
                    </span>
                  )}
                </Row>
              ))}
            </Col>
          </Row>
        </div>
      ) : (
        ''
      ),
  );
  return (
    <div className="event-body">
      <h1 className="schedule-title">Papers</h1>
      <Grid className="landing-page-papers-grid">
        {deadline ? (
          <div>
            <Row className="card-detail-row">
              <Col xs={3} className="landing-page-papers-first-row">
                Topic
              </Col>
              <Col xs={9} className="landing-page-papers-first-row">
                Paper
              </Col>
            </Row>
            {content}
          </div>
        ) : (
          noData
        )}
      </Grid>
    </div>
  );
};

export default PaperList;
