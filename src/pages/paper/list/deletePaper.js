import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { connect } from 'react-redux';
import { paperActions } from 'store/ducks/paper';

class DeletePaper extends Component {
  styles = {
    margin: 10,
  };
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  async handleDelete() {
    try {
      await this.props.DELETE_PAPER({
        variables: {
          id: this.props.paper.id,
        },
        refetchQueries: [
          {
            query: queries.GET_ALL_PAPERS,
          },
        ],
      });
      this.props.setToggle();
    } catch (error) {}
  }

  render() {
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
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
  return {
    paper: state.paper.data,
    openModal: state.paper.openModal,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(mutations.DELETE_PAPER, {
    name: 'DELETE_PAPER',
    option: ownProps => ({
      variables: {
        id: ownProps.id,
      },
    }),
  }),
)(DeletePaper);
