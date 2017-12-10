import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton, Dialog, IconButton } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationClose } from 'material-ui/svg-icons';
import { queries, mutations } from '../helpers';
import { graphql, compose } from 'react-apollo';
import { conferenceCoOranizerActions } from 'store/ducks/conference/info/coOrganizer';
import CoOrganizerInfo from '../coOrganizer';
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
      openDelete: false,
      coOrganizer: {},
      title: '',
      isAdding: false,
      isDeleting: false,
    };
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenAdding = this.handleOpenAdding.bind(this);
  }
  handleDialog() {
    this.props.toggleModalForm();
  }
  handleOpenEdit(coOrganizer) {
    this.setState({ isAdding: false, title: 'Edit Information' }, () => {
      this.props.toggleModalForm();
    });
    this.setState({
      coOrganizer: coOrganizer,
    });
  }
  handleOpenDelete(coOrganizerId, coOrganizerName) {
    this.setState({
      coOrganizerId: coOrganizerId,
      coOrganizerName: coOrganizerName,
      isDeleting: true,
    });
  }
  handleCloseDelete() {
    this.setState({ isDeleting: false });
  }
  handleOpenAdding() {
    this.setState({ isAdding: true, title: 'Add new Co-Organizer' }, () => {
      this.props.toggleModalForm();
    });
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
        isDeleting: false,
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const coOrganizerDetails = this.props.coOrganizerDetails;
    const conferenceId = this.props.conferenceId;
    const actions = [
      <IconButton
        tooltip="Close"
        className="cancel-btn dialog"
        onClick={this.handleDialog}
      >
        <NavigationClose color="white" />
      </IconButton>,
    ];
    const actionDelete = [
      <RaisedButton
        label="Yes"
        primary={true}
        onClick={this.handleDelete}
        type="submit"
      />,
      <RaisedButton
        className="marginLeft"
        label="No"
        onClick={this.handleCloseDelete}
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
              primary={true}
              onClick={() => {
                this.handleOpenEdit(props.value);
              }}
            />
            <RaisedButton
              label="Delete"
              secondary={true}
              onClick={() => {
                this.handleOpenDelete(props.value.id, props.value.name);
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
          titleStyle={{ backgroundColor: '#3E5566', color: 'white' }}
          title={this.state.title}
          actions={actions}
          modal={true}
          open={this.props.openModalForm}
          onRequestClose={this.handleDialog}
        >
          <CoOrganizerInfo
            coOrganizerDetails={this.state.coOrganizer}
            onSubmit={this.handleDialog}
            isAdd={this.state.isAdding}
            conferenceId={conferenceId}
          />
        </Dialog>
        <Dialog
          title={<p>Do you want to delete {this.state.coOrganizerName} ?</p>}
          modal={true}
          onRequestClose={this.handleCloseDelete}
          open={this.state.isDeleting}
          actions={actionDelete}
        />
        <div className="d-flex btn-group marginBottom">
          <RaisedButton
            label="Add Co-Organizer"
            primary={true}
            onClick={this.handleOpenAdding}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  openModalForm: state.conferenceCoOranizer.openCoOrganizerFormModal,
});

const mapDispatchToProps = dispatch => ({
  toggleModalForm: bindActionCreators(
    conferenceCoOranizerActions.toggleCoOrganizerFormModal,
    dispatch,
  ),
});
export default compose(
  graphql(mutations.DELETE_COORGANIZER, {
    name: 'DELETE_COORGANIZER',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Index);
