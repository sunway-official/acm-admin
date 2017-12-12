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
    console.log(values);
    try {
      const isAuthor = localStorage.getItem('roles').indexOf('7');
      console.log(isAuthor);
      let paper;
      if (isAuthor > -1) {
        paper = await this.props.INSERT_PAPER({
          variables: {
            title: values.title,
            abstract: values.abstract,
            keywords: values.keywords,
          },
          refetchQueries: [
            {
              query: queries.GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID,
            },
          ],
        });
      } else {
        paper = await this.props.INSERT_PAPER({
          variables: {
            title: values.title,
            abstract: values.abstract,
            keywords: values.keywords,
          },
          refetchQueries: [
            {
              query: queries.GET_PAPERS_BY_CONFERENCE_ID,
            },
          ],
        });
      }

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
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
    }
  }

  render() {
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
)(Index);
