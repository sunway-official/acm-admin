import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { graphql, compose } from 'react-apollo';
import {
  DELETE_CONFERENCE_BY_ID,
  GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
} from './../helpers/mutation';

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
    const actions = [
      <RaisedButton label="Yes" secondary={true} onClick={this.handleDelete} />,
      <RaisedButton
        label="No"
        default={true}
        onClick={this.props.handleClose}
        style={{ marginLeft: '10px' }}
      />,
    ];

    // const id = this.props.id;
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
