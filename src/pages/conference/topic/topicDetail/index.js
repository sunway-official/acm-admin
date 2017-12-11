import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../helpers';
import TopicDetail from './topicDetail';
import { withRouter } from 'react-router';
import AlertContainer from 'react-alert';
import {
  alertOptions,
  MyExclamationTriangle,
  MyFaCheck,
} from '../../../../theme/alert';

class Index extends Component {
  constructor(props) {
    super(props);
    this.saveInformation = this.saveInformation.bind(this);
  }
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/topics-management');
      },
    });
  };
  async saveInformation(values) {
    const { UPDATE_TOPIC_IN_CONFERENCE_MUTATION } = this.props;
    try {
      await UPDATE_TOPIC_IN_CONFERENCE_MUTATION({
        variables: {
          id: values.id,
          name: values.name,
          description: values.description,
          color_id: values.color_id,
        },
        refetchQueries: [
          {
            query: queries.GET_TOPIC_BY_ID_QUERY,
            variables: { id: this.props.match.params.topic_id },
          },
        ],
      });
      // window.alert('success');
      // this.props.history.replace('/conference/topics-management');
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.showAlertError(temp.substring(7, temp.length));
      //alert(temp.substring(7, temp.length));
    }
  }
  render() {
    const loadingTopic = this.props.GET_TOPIC_BY_ID_QUERY.loading;
    const loadingColor = this.props.GET_ALL_COLORS_QUERY.loading;
    if (loadingTopic || loadingColor) return <div> loading</div>;
    const { getTopicByID } = this.props.GET_TOPIC_BY_ID_QUERY;
    const { getAllColors } = this.props.GET_ALL_COLORS_QUERY;
    const colorsList = getAllColors;
    const topicDetail = getTopicByID;
    return (
      <div className="conference">
        <Subheader className="subheader"> Topic Detail</Subheader>
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
          <Link className="d-flex" to="/conference/topics-management">
            <span>Topics Management</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Topic Detail</span>
        </div>
        <div className="dashboard content d-flex">
          <TopicDetail
            topicDetail={topicDetail}
            colorsList={colorsList}
            onSubmit={this.saveInformation}
          />
          <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
        </div>
      </div>
    );
  }
}
export default compose(
  withRouter,
  graphql(queries.GET_TOPIC_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.topic_id },
    }),
    name: 'GET_TOPIC_BY_ID_QUERY',
  }),
  graphql(mutations.UPDATE_TOPIC_IN_CONFERENCE_MUTATION, {
    name: 'UPDATE_TOPIC_IN_CONFERENCE_MUTATION',
  }),
  graphql(queries.GET_ALL_COLORS_QUERY, {
    name: 'GET_ALL_COLORS_QUERY',
  }),
)(Index);
