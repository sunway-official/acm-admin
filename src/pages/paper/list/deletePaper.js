import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';
import { paperActions } from 'store/ducks/paper';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
class DeletePaper extends Component {
  styles = {
    margin: 10,
  };
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  showAlertSuccess = () => {
    this.msg.success('Deleted!', {
      type: 'success',
      icon: <MyFaCheck />,
    });
  };
  async handleDelete() {
    console.log(this.props);
    let topic_id = 0;
    if (this.props.paper.papersTopic[0])
      topic_id = this.props.paper.papersTopic[0].topic_id;

    const paper_id = this.props.paper.id;
    try {
      await this.props.DELETE_PAPER_TOPIC({
        variables: {
          paper_id: paper_id,
          topic_id: topic_id,
        },
        refetchQueries: [
          {
            query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
            variables: {
              topic_id: topic_id,
            },
          },
        ],
      });
      console.log('check');
      const isAuthor = localStorage.getItem('roles').indexOf('7');
      if (isAuthor > -1) {
        await this.props.DELETE_PAPER({
          variables: {
            id: paper_id,
          },
          refetchQueries: [
            {
              query: queries.GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID,
            },
            {
              query: queries.GET_ALL_PAPERS_BY_TOPIC_ID_QUERY,
              variables: {
                topic_id: topic_id,
              },
            },
          ],
        });
      } else {
        await this.props.DELETE_PAPER({
          variables: {
            id: paper_id,
          },
          refetchQueries: [
            {
              query: queries.GET_PAPERS_BY_CONFERENCE_ID,
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
      this.props.setToggle();
      this.showAlertSuccess();
    } catch (error) {
      let temp = error.graphQLErrors[0].message;
      this.props.setToggle();

      this.showAlertError(temp.substring(7, temp.length));
    }
  }

  render() {
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={() => {
          this.handleDelete();
        }}
        type="submit"
      />,
      <RaisedButton
        label="No"
        onClick={() => {
          this.props.setToggle();
        }}
        style={this.styles}
      />,
    ];
    return (
      <div>
        <Dialog
          title={'Do you want to delete this paper?'}
          actions={actionDelete}
          open={this.props.openModal}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setToggle: () => dispatch(paperActions.setToggle()),
  };
};
const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    console.log('state', state);
    return {
      paper: state.paper.data,
      openModal: state.paper.openModal,
    };
  }
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.DELETE_PAPER, {
    name: 'DELETE_PAPER',
  }),
  graphql(mutations.DELETE_PAPER_TOPIC, {
    name: 'DELETE_PAPER_TOPIC',
  }),
)(DeletePaper);
