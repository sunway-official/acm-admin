import ReactTable from 'react-table';
import React, { Component } from 'react';
import 'react-table/react-table.css';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { Subheader } from 'material-ui';
import { queries } from '../helpers';

const style = {
  textAlign: 'center',
  lineHeight: '200%',
};

const styleBtn = {
  margin: '0px 10px',
};
const columns = [
  {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
    minWidth: 100,
    Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
  },
  {
    Header: 'Email',
    accessor: 'email', // String-based value accessors!
    maxWidth: 600,
    minWidth: 400,
    Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
  },
  {
    Header: 'Website',
    accessor: 'website',
    maxWidth: 100,
    minWidth: 10000,
  },
  {
    Header: 'Phone-Number',
    accessor: 'phone',
    maxWidth: 400,
    minWidth: 300,
  },
  {
    Header: 'Action',
    maxWidth: 600,
    minWidth: 400,
    filterable: false,
    accessor: 'action', // String-based value accessors!
    Cell: row => (
      <div style={style}>
        <RaisedButton label="Edit" primary={true} />
        <RaisedButton label="Delete" />
      </div>
    ),
  },
];

const sorted = [
  {
    id: 'name',
    desc: true,
  },
];

class Index extends Component {
  render() {
    const { loading, coOrganizerDetails } = this.props;
    if (loading) return <div>Loading...</div>;
    let coOrganizer;
    if (coOrganizerDetails) {
      coOrganizer = coOrganizerDetails;
    }
    return (
      <ReactTable
        filterable
        data={coOrganizer}
        columns={columns}
        defaultSorted={sorted}
        defaultPageSize={10}
        className="-striped -highlight"
        showPaginationTop
        showPaginationBottom
      />
    );
  }
}

export default graphql(queries.GET_CURRENT_CONFERENCE, {
  name: 'GET_CURRENT_CONFERENCE',
})(Index);
