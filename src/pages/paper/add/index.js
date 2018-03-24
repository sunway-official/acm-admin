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
import { connect } from 'react-redux';

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
    console.log('props', this.props);
    try {
      let paper, paperAuthor;
      paper = await this.props.INSERT_PAPER({
        variables: {
          paper_status_id: 1,
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
          topic_id: values.topic,
          file: values.file,
        },
      });

      console.log('paper', paper);
      await this.props.INSERT_PAPER_TOPIC({
        variables: {
          paper_id: paper.data.insertPaper.id,
          topic_id: values.topic,
        },
        // refetchQueries: [
        //   {
        //     query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
        //     variables: {
        //       topic_id: values.topic,
        //     },
        //   },
        //   {
        //     query: queries.GET_TOPICS_BY_PAPER_ID,
        //     variables: {
        //       paper_id: paper.data.insertPaper.id,
        //     },
        //   },
        // ],
      });

      paperAuthor = await this.props.INSERT_PAPER_AUTHOR({
        variables: {
          paper_id: paper.data.insertPaper.id,
          user_id: this.props.data.me.id,
          corresponding: 1,
          author_name:
            this.props.data.me.lastname + this.props.data.me.lastname,
          author_email: this.props.data.me.email,
          author_title: this.props.data.me.title,
          // author_organizer: this.props.data.me.organization,
          author_street: values.street,
          author_city: values.city,
          author_country: values.country,
          paper_status_id: 1,
        },
      });

      console.log('paperAuthor', paperAuthor);
      await values.addAuthors.map(author => {
        this.props.INSERT_PAPER_AUTHOR({
          variables: {
            paper_id: paper.data.insertPaper.id,
            topic_id: author.topic,
            corresponding: 2,
            author_name: author.author_name,
            author_email: author.author_email,
            author_title: author.author_title,
            // author_organizer: author.author_organizer,
            author_country: author.author_country,
            paper_status_id: 1,
          },
        });
      });

      this.showAlertSuccess();
    } catch (error) {
      // let temp = error.graphQLErrors[0].message;
      this.showAlertError(error);
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
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    return {
      conference: state.auth.currentUser.currentConference,
    };
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(mutations.INSERT_PAPER_TOPIC, {
    name: 'INSERT_PAPER_TOPIC',
  }),
  graphql(mutations.INSERT_PAPER, {
    name: 'INSERT_PAPER',
  }),
  graphql(mutations.INSERT_PAPER_AUTHOR, {
    name: 'INSERT_PAPER_AUTHOR',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.ME_QUERY),
)(Index);
