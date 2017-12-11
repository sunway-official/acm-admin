import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css';
import RaisedButton from 'material-ui/RaisedButton';
import { gql, graphql } from 'react-apollo';
import { Subheader } from 'material-ui';
import Loading from '../components/render/renderLoading';

const style = {
  textAlign: 'center',
  lineHeight: '200%',
};

const styleBtn = {
  margin: '0px 10px',
};
const columns = [
  {
    Header: 'ID',
    accessor: 'id', // String-based value accessors!
    minWidth: 100,
    Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
    Footer: () => <div style={style}>ID</div>,
  },
  {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
    maxWidth: 600,
    minWidth: 400,
    Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
    Footer: () => <div style={style}>Name</div>,
  },
  {
    Header: 'Color code',
    accessor: 'color_code',
    maxWidth: 400,
    minWidth: 300,
    Footer: () => <div style={style}>Color code</div>,
    Cell: props => <div style={style}>{props.value}</div>, // Custom cell components!
  },
  {
    Header: 'Action',
    maxWidth: 600,
    minWidth: 400,
    filterable: false,
    Footer: () => <div style={style}>Action</div>,
    accessor: 'action', // String-based value accessors!
    Cell: row => (
      <div style={style}>
        <RaisedButton label="Primary" primary={true} style={styleBtn} />
        <RaisedButton label="Secondary" secondary={true} style={styleBtn} />
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

const Index = props => {
  console.log(props);
  const {
    loading,
    getTopicsOfConference,
  } = props.GET_TOPICS_OF_CONFERENCE_QUERY;
  if (loading) return <Loading />;
  const topics = getTopicsOfConference;
  return (
    <div className="conference">
      <Subheader className="subheader conf-infor-title">
        {' '}
        Conference Information
      </Subheader>
      <div className="page-breadcrumb d-flex">
        <span>Conference Information</span>
      </div>
      <div className="dashboard content d-flex">
        <ReactTable
          filterable
          data={topics}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={10}
          className="-striped -highlight"
          showPaginationTop
          showPaginationBottom
        />
      </div>
    </div>
  );
};

export const GET_TOPICS_OF_CONFERENCE_QUERY = gql`
  query getTopicsOfConference {
    getTopicsOfConference {
      id
      name
      description
      color_code
    }
  }
`;

export default graphql(GET_TOPICS_OF_CONFERENCE_QUERY, {
  name: 'GET_TOPICS_OF_CONFERENCE_QUERY',
})(Index);
