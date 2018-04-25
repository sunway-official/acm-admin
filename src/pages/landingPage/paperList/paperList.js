import React from 'react';
import * as moment from 'moment';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
const S3_GET_PREFIX = process.env.REACT_APP_S3_GET_PREFIX;

const PaperList = props => {
  const papers = props.papers;
  const noData = (
    <div className="no-data">
      The papers will be published in <span />
      {moment(papers[0].conference.dl_release_final_paper).format('DD-MM-YYYY')}
    </div>
  );
  const deadline = moment().isSameOrAfter(
    papers[0].conference.dl_release_final_paper,
  );
  let content;
  content = papers.map(
    topic =>
      topic.papers.length > 0 ? (
        <Row className="card-detail-row" key={topic.id}>
          <Col xs={3} className="landing-page-topic-title">
            {topic.name}
          </Col>
          <Col xs={9}>
            {topic.papers.map((paper, index) => (
              <Row key={paper.id}>
                {paper.file && (
                  <a
                    href={S3_GET_PREFIX + paper.file}
                    target="_blank"
                    className="landing-page-paper-a"
                  >
                    <span className="landing-page-paper-title">
                      {index + 1}. {paper.title} ({paper.authors[0].author_name})
                    </span>
                  </a>
                )}
              </Row>
            ))}
          </Col>
        </Row>
      ) : (
        ''
      ),
  );
  return (
    <div className="event-body">
      <h1 className="schedule-title">Papers</h1>
      <Grid className="landing-page-papers-grid">
        {papers.length > 0 && deadline ? (
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
