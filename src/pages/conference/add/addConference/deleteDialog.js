import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { graphql, compose } from 'react-apollo';
import {
  DELETE_CONFERENCE_BY_ID,
  GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
} from './mutation';

class DeleteDialog extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    const { DELETE_CONFERENCE_BY_ID } = this.props;

    DELETE_CONFERENCE_BY_ID({
      variables: {
        id: this.props.id,
      },
      refetchQueries: [
        {
          query: GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
          variables: {
            user_id: this.props.userId,
          },
        },
      ],
    }).catch(error => {
      console.log('There was an error sending the query', error);
    });
    this.props.handleClose();
  }

  render() {
    console.log(this.props);
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton label="Submit" primary={true} onClick={this.handleDelete} />,
    ];

    const id = this.props.id;
    console.log(id);
    return (
      <div>
        <Dialog
          title="Delete conference"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
        >
          Do you want to delete this conference?
        </Dialog>
      </div>
    );
  }
}

export default compose(
  graphql(DELETE_CONFERENCE_BY_ID, { name: 'DELETE_CONFERENCE_BY_ID' }),
)(DeleteDialog);
