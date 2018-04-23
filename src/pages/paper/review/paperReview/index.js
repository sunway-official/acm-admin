import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { queries, mutations } from '../../helpers';
import PaperInfo from '../../paperInfo';
import ReviewQuestions from './reviewQuestions';
import { Grid } from 'react-flexbox-grid';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        window.location.reload();
        this.props.history.replace(
          `/conference/paper/review-detail/${this.props.ME_QUERY.me.id}/${this
            .props.match.params.id}`,
        );
      },
    });
  };
  async handleSubmit(values) {
    const {
      INSERT_PAPER_REVIEW_QUESTION,
      GET_ALL_REVIEW_QUESTIONS_QUERY,
    } = this.props;
    try {
      let generalPoint = 0;
      const length =
        GET_ALL_REVIEW_QUESTIONS_QUERY.getAllReviewQuestions.length;
      GET_ALL_REVIEW_QUESTIONS_QUERY.getAllReviewQuestions.forEach(
        (element, index) => {
          let point = 'point' + (index + 1);
          if (index + 1 > 2) {
            generalPoint = generalPoint + values[point];
          }
        },
      );
      generalPoint = generalPoint / (length - 2);
      for (let element of GET_ALL_REVIEW_QUESTIONS_QUERY.getAllReviewQuestions) {
        let input = 'input' + element.id;
        let point = 'point' + element.id;
        await INSERT_PAPER_REVIEW_QUESTION({
          variables: {
            paper_id: this.props.GET_PAPER_BY_ID.getPaperByID.id,
            review_question_id: element.id,
            point: element.id > 2 ? values[point] : generalPoint, //if it is detail or general comment then use the general point
            comment: values[input],
          },
          refetchQueries: [
            {
              query: queries.GET_PAPER_BY_ID,
              variables: {
                id: this.props.match.params.id,
              },
            },
          ],
        });
      }
      this.showAlertSuccess();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const loadingPaper = this.props.GET_PAPER_BY_ID.loading;
    const loadingMe = this.props.ME_QUERY.loading;
    const loadingReviewQuestions = this.props.GET_ALL_REVIEW_QUESTIONS_QUERY
      .loading;
    if (loadingReviewQuestions || loadingPaper || loadingMe) return <Loading />;
    const paper = this.props.GET_PAPER_BY_ID.getPaperByID;
    const questions = this.props.GET_ALL_REVIEW_QUESTIONS_QUERY
      .getAllReviewQuestions;
    return (
      <div className="conference">
        <Subheader className="subheader">
          {localStorage.getItem('conferenceTitle')}
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
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
          <span>Paper Review</span>
        </div>
        <div className="dashboard content d-flex">
          <Grid className="paper-detail-grid">
            <PaperInfo paper={paper} />
            <ReviewQuestions
              questions={questions}
              onSubmit={this.handleSubmit}
            />
          </Grid>
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_ALL_REVIEW_QUESTIONS_QUERY, {
    name: 'GET_ALL_REVIEW_QUESTIONS_QUERY',
  }),
  graphql(queries.ME_QUERY, {
    name: 'ME_QUERY',
  }),
  graphql(queries.GET_PAPER_BY_ID, {
    name: 'GET_PAPER_BY_ID',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id,
      },
    }),
  }),
  graphql(mutations.INSERT_PAPER_REVIEW_QUESTION, {
    name: 'INSERT_PAPER_REVIEW_QUESTION',
  }),
)(Index);
