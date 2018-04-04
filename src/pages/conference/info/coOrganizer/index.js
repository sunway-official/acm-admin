import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton, Dialog } from 'material-ui';
import { withRouter } from 'react-router';
import { queries, mutations } from '../helpers';
import { graphql, compose } from 'react-apollo';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
const style = {
  textAlign: 'center',
  lineHeight: '200%',
};

const styleBtn = {
  margin: '0px 10px',
};

const sorted = [
  {
    id: 'name',
    desc: true,
  },
];

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coOrganizer: {},
      title: '',
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  showAlertSuccess = () => {
    this.msg.success('Deleted!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.setState({ disableAdd: false });
      },
    });
  };

  handleOpen(coOrganizerId, coOrganizerName) {
    this.setState({
      coOrganizerId: coOrganizerId,
      coOrganizerName: coOrganizerName,
      open: true,
    });
  }
  handleClose() {
    this.setState({ open: false });
  }

  async handleDelete() {
    try {
      await this.props.DELETE_COORGANIZER({
        variables: {
          id: this.state.coOrganizerId,
        },
        refetchQueries: [
          {
            query: queries.GET_CURRENT_CONFERENCE,
          },
        ],
      });
      this.setState({
        open: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const coOrganizerDetails = this.props.coOrganizerDetails;

    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={() => {
          this.handleDelete();
          this.showAlertSuccess();
          this.setState({ disableAdd: true });
        }}
        type="submit"
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={this.handleClose}
        style={this.styleBtn}
      />,
    ];

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        minWidth: 200,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Email',
        accessor: 'email',
        minWidth: 150,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Website',
        accessor: 'website',
        minWidth: 120,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Phone-Number',
        accessor: 'phone',
        minWidth: 100,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Action',
        minWidth: 150,
        filterable: false,
        accessor: '',
        Cell: props => (
          <div style={style}>
            <RaisedButton
              label="Edit"
              default={true}
              onClick={() => {
                this.props.history.push(
                  `/conference/edit-co-organizer/${props.value.id}`,
                );
              }}
            />
            <RaisedButton
              label="Delete"
              secondary={true}
              onClick={() => {
                this.handleOpen(props.value.id, props.value.name);
              }}
              style={styleBtn}
            />
          </div>
        ),
      },
    ];

    return (
      <div>
        <ReactTable
          filterable
          data={coOrganizerDetails}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={5}
          className="-striped -highlight"
        />

        <Dialog
          title={<p>Do you want to delete {this.state.coOrganizerName} ?</p>}
          modal={true}
          onRequestClose={this.handleClose}
          open={this.state.open}
          actions={actionDelete}
        />
        <div className="d-flex btn-group justify-content-center marginBottom">
          <RaisedButton
            label="Add Co-Organizer"
            primary={true}
            disabled={this.state.disableAdd}
            onClick={() => {
              this.props.history.push('/conference/add-co-organizer');
            }}
          />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(mutations.DELETE_COORGANIZER, {
    name: 'DELETE_COORGANIZER',
  }),
)(Index);
