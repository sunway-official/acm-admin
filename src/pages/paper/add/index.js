import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { withRouter } from 'react-router';
import Form from '../form';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';
import '../style/style.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
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
  async handleAdd(values) {
    console.log('value', values);
    try {
      let paper;
      paper = await this.props.INSERT_PAPER({
        variables: {
          paper_status_id: 1,
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
          file: values.file,
        },
        refetchQueries: [
          {
            query: queries.getPaperByID,
            variables: {
              paper_id: paper.data.insertPaper.id,
            },
          },
        ],
      });

      console.log('paper', paper);
      await this.props.INSERT_PAPER_TOPIC({
        variables: {
          paper_id: paper.data.insertPaper.id,
          topic_id: values.topic,
        },
        refetchQueries: [
          {
            query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
            variables: {
              topic_id: values.topic,
            },
          },
          {
            query: queries.GET_TOPICS_BY_PAPER_ID,
            variables: {
              paper_id: paper.data.insertPaper.id,
            },
          },
        ],
      });

      await this.props.INSERT_PAPER_AUTHOR({
        variables: {
          paper_id: paper.data.insertPaperAuthor.id,
          user_id: this.props.data.me.id,
          topic_id: values.topic,
          corresponding: 1,
          author_name:
            this.props.data.me.lastname + this.props.data.me.lastname,
          author_email: this.props.data.me.email,
          author_title: this.props.data.me.title,
          author_organizer: this.props.data.me.organization,
          author_country: this.props.data.me.address.id,
        },
        refetchQueries: [
          {
            query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
            variables: {
              topic_id: values.topic,
            },
          },
          {
            query: queries.GET_TOPICS_BY_PAPER_ID,
            variables: {
              paper_id: paper.data.insertPaper.id,
            },
          },
        ],
      });

      await values.addAuthors.map(author => {
        this.props.INSERT_PAPER_AUTHOR({
          variables: {
            paper_id: paper.data.insertPaperAuthor.id,
            topic_id: author.topic,
            corresponding: 2,
            author_name: author.author_name,
            author_email: author.author_email,
            author_title: author.author_title,
            author_organizer: author.author_organizer,
            author_country: author.author_country,
          },
          refetchQueries: [
            {
              query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
              variables: {
                topic_id: values.topic,
              },
            },
            {
              query: queries.GET_TOPICS_BY_PAPER_ID,
              variables: {
                paper_id: paper.data.insertPaper.id,
              },
            },
          ],
        });
      });

      this.showAlertSuccess();
    } catch (error) {
      // let temp = error.graphQLErrors[0].message;
      // this.showAlertError(
      //   error,
      // .substring(7, temp.length)
      // );
      console.log('errr', error);
    }
  }

  render() {
    console.log('pro', this.props);
    const {
      loading,
      getTopicsOfConference,
    } = this.props.GET_TOPICS_OF_CONFERENCE;
    let topics;
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    if (loading) return <Loading />;
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
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
          <span>Paper Management</span>
        </div>
        <div className="dashboard content d-flex">
          <Form onSubmit={this.handleAdd} topics={topics} />
        </div>
        {/* <AlertContainer ref={a => (this.msg = a)} {...alertOptions} /> */}
      </div>
    );
  }
}

export default compose(
  withRouter,
  // connect(mapStateToProps, undefined),
  graphql(mutations.INSERT_PAPER_TOPIC, {
    name: 'INSERT_PAPER_TOPIC',
  }),
  graphql(mutations.INSERT_PAPER, {
    name: 'INSERT_PAPER',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.ME_QUERY),
)(Index);
