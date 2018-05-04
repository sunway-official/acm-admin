import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Form from './editForm';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import S3 from 'lib/s3';

import Loading from 'components/render/renderLoading';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      key: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  async handleUploadFile(e) {
    const file = e.target.files[0];
    const fileName = file.name;
    // const hashedFile = await toBase64Async(file, 'pdf');
    const { Key } = await S3.putAsync({
      name: fileName,
      bodyFile: file,
      isImage: false,
    });
    this.setState({ key: Key });
    return Key;
  }

  // eslint-disable-next-line
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/papers');
      },
    });
  };
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  async handleSave(values) {
    const {
      UPDATE_PAPER,
      UPDATE_TOPIC_OF_PAPER,
      UPDATE_PAPER_AUTHOR,
    } = this.props;

    const key = this.state.key;
    let correspondingValue = 3;
    try {
      const isAuthor = localStorage.getItem('roles').indexOf('7');
      let paper;
      if (isAuthor > -1) {
        paper = await UPDATE_PAPER({
          variables: {
            paper_status_id: 3,
            id: this.props.match.params.id,
            title: values.title,
            abstract: values.abstract,
            keywords: values.keywords,
            file: key,
          },
        });
      }
      if (values.topic) {
        const topic_id = paper.data.updatePaper.papersTopic[0].topic_id;
        await UPDATE_TOPIC_OF_PAPER({
          variables: {
            paper_id: this.props.match.params.id,
            topic_id: values.topic,
          },
          refetchQueries: [
            {
              query: queries.GET_TOPICS_BY_PAPER_ID,
              variables: {
                paper_id: this.props.match.params.id,
              },
            },
            {
              query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
              variables: {
                topic_id: values.topic,
              },
            },
            {
              query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
              variables: {
                topic_id: topic_id,
              },
            },
          ],
        });
      }

      await UPDATE_PAPER_AUTHOR({
        variables: {
          id: values.coresponding_id,
          author_street: values.street,
          author_city: values.city,
          author_country: values.country,
          author_zipcode: values.zipcode,
        },
      });

      if (values.editAuthors) {
        await values.editAuthors.map(author => {
          if (author.corresponding === true) {
            correspondingValue = 2;
          } else {
            correspondingValue = 3;
          }
          UPDATE_PAPER_AUTHOR({
            variables: {
              id: author.id,
              topic_id: author.topic,
              corresponding: correspondingValue,
              author_name: author.firstname + ' ' + author.lastname,
              author_email: author.email,
              author_title: author.title,
              author_organization: author.organization,
              author_street: author.authorStreet,
              author_city: author.authorCity,
              author_country: author.authorCountry,
              author_zipcode: author.authorZipcode,
            },
          });
          return 1;
        });
      }
      this.showAlertSuccess();
    } catch (error) {
      this.showAlertError('Resubmit paper fail');
    }
  }
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingTopics = this.props.GET_TOPICS_OF_CONFERENCE.loading;
    const loadingPaperTopics = this.props.GET_TOPICS_BY_PAPER_ID.loading;
    const { getPaperByID } = this.props.GET_PAPER_BY_ID;
    const { getTopicsOfConference } = this.props.GET_TOPICS_OF_CONFERENCE;
    const { getTopicsByPaperID } = this.props.GET_TOPICS_BY_PAPER_ID;
    if (loadingPaper || loadingTopics || loadingPaperTopics) return <Loading />;
    let paper, topics, paperTopicsActive, initialValues;
    if (getTopicsByPaperID) {
      paperTopicsActive = getTopicsByPaperID;
    }
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    if (getPaperByID) {
      paper = getPaperByID;

      let corresponding_author;
      corresponding_author = paper.authors
        .filter(function(author) {
          return author.corresponding === 1;
        })
        .map(author => {
          return author;
        });

      let editAuthors;
      editAuthors = paper.authors
        .filter(function(author) {
          return author.corresponding !== 1;
        })
        .map(author => {
          return author;
        });

      initialValues = {
        id: paper.id,
        title: paper.title,
        abstract: paper.abstract,
        keywords: paper.keywords,
        topic: paperTopicsActive[0].topic.id,
        street: corresponding_author[0].author_street,
        city: corresponding_author[0].author_city,
        country: corresponding_author[0].author_country,
        zipcode: corresponding_author[0].author_zipcode,
        editAuthors: editAuthors,
        coresponding_id: corresponding_author[0].id,
      };
    }
    return (
      <div className="conference">
        <Subheader className="subheader">Edit paper</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dasboard</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Edit paper</span>
        </div>
        <div className="dashboard content d-flex">
          <Form
            initialValues={initialValues}
            onSubmit={this.handleSave}
            topics={topics}
            paperTopicsActive={paperTopicsActive[0].topic.name}
            handleUploadFile={this.handleUploadFile}
          />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state.topics) {
    return {
      topic: state.topics.data,
    };
  }
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.GET_TOPICS_BY_PAPER_ID, {
    name: 'GET_TOPICS_BY_PAPER_ID',
    options: ownProps => ({
      variables: {
        paper_id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(mutations.UPDATE_PAPER, {
    name: 'UPDATE_PAPER',
  }),
  graphql(mutations.UPDATE_TOPIC_OF_PAPER, {
    name: 'UPDATE_TOPIC_OF_PAPER',
  }),
  graphql(mutations.UPDATE_PAPER_AUTHOR, {
    name: 'UPDATE_PAPER_AUTHOR',
  }),
)(Index);
