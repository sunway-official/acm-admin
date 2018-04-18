import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';

const AuthorInfo = props => {
  let authors;
  // map author information
  if (props.authors.length > 0) {
    authors = props.authors.map(author => (
      <Row around="xs" className="card-detail-row" key={author.id}>
        <Col xs={3}>{author.author_name}</Col>
        <Col xs={3}>{author.author_email}</Col>
        <Col xs={2}>{author.author_country}</Col>
        <Col xs={2}>{author.author_organization}</Col>
        <Col xs={2}>
          {//eslint-disable-next-line
          author.corresponding == 1 ? (
            <ActionCheckCircle color="37d67a" style={{ paddingLeft: '2em' }} />
          ) : (
            <ActionHighlightOff color="ff0000" style={{ paddingLeft: '2em' }} />
          )}
        </Col>
      </Row>
    ));
  }
  return (
    <Row className="paper-card" around="xs">
      <Col xs={12} sm={12} md={12} lg={12} className="paper-col">
        <Row center="xs" className="card-detail-row first-row">
          <b style={{ fontSize: '1.5em' }}>Author Information</b>
        </Row>
        <Row around="xs" className="card-detail-row">
          <Col xs={3} className="paper-detail-title">
            Name
          </Col>
          <Col xs={3} className="paper-detail-title">
            Email
          </Col>
          <Col xs={2} className="paper-detail-title">
            Country
          </Col>
          <Col xs={2} className="paper-detail-title">
            Organization
          </Col>
          <Col xs={2} className="paper-detail-title">
            Coresponding
          </Col>
        </Row>
        {authors}
      </Col>
    </Row>
  );
};

export default AuthorInfo;
