import React from 'react';
import {
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
  ME_QUERY,
} from './../helpers/mutation';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Dialog,
  FloatingActionButton,
  FlatButton,
  IconButton,
} from 'material-ui';
import { graphql, compose } from 'react-apollo';
import AddConferenceForm from './addForm';

const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
  maxHeight: '100%',
};

class DialogInsertConf extends React.Component {
  state = {
    open: false,
  };
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      position: {
        lat: '',
        long: '',
      },
    };
    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onMapPositionChanged(position) {
    this.props.getPosition(position);
  }

  submit(values) {
    // console.log(values);
    const {
      INSERT_ORGANIZER_DETAIL_MUTATION,
      INSERT_CONFERENCE_MUTATION,
    } = this.props;

    console.log(this.props.position);
    const id = values.address.id;
    this.props.UPDATE_ADDRESS_MUTATION({
      variables: {
        id: id,
        lat: this.props.position.lat,
        long: this.props.position.lng,
      },
    });

    const user_id = this.props.data.me.id;
    INSERT_ORGANIZER_DETAIL_MUTATION({
      variables: {
        user_id: user_id,
        name: values.organizerName,
        email: values.organizerEmail,
        website: values.organizerWebsite,
        address: values.organizerAddress,
        phone: values.organizerPhoneNumber,
      },
    })
      .then(({ data }) => {
        // eslint-disable-next-line array-callback-return
        INSERT_CONFERENCE_MUTATION({
          variables: {
            organizer_detail_id: data.insertOrganizerDetail.id,
            address_id: values.address_id,
            title: values.title,
            description: values.description,
            start_date: values.startDate,
            end_date: values.endDate,
            bg_image: values.bg_image,
          },
          refetchQueries: [
            {
              query: GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
              variables: { user_id: user_id },
            },
          ],
        });
        // console.log(data);
      })
      .catch(error => {
        console.log('There was an error sending the query', error);
      });
    // console.log(values);
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
    ];

    return (
      <div>
        <FloatingActionButton mini={true} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Insert conference"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
          autoScrollBodyContent={true}
          rightIcon={<IconButton iconClassName="muidocs-icon-custom-github" />}
        >
          <AddConferenceForm
            onSubmit={this.submit}
            handleClose={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

export default compose(
  graphql(INSERT_CONFERENCE_MUTATION, { name: 'INSERT_CONFERENCE_MUTATION' }),
  graphql(INSERT_ORGANIZER_DETAIL_MUTATION, {
    name: 'INSERT_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(ME_QUERY),
)(DialogInsertConf);
