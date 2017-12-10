import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { withRouter } from 'react-router';
import Form from './form';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
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
  async handleAdd(values) {
    console.log(values);
    try {
      const paper = await this.props.INSERT_PAPER({
        variables: {
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
        },
      });
      await this.props.INSERT_PAPER_TOPIC({
        variables: {
          paper_id: paper.data.insertPaper.id,
          topic_id: values.topic,
        },
        refetchQueries: [
          {
            query: queries.GET_PAPERS_BY_CONFERENCE_ID,
          },
        ],
      });
      this.showAlertSuccess();
    } catch (error) {
      throw error;
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
    if (loading) return <div>Loading...</div>;
    return (
      <div className="conference">
        <Subheader className="subheader">Paper Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
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
