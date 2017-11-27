import ReactTable from 'react-table';
import React from 'react';
import 'react-table/react-table.css';
import RaisedButton from 'material-ui/RaisedButton';
import { gql, graphql } from 'react-apollo';
import { Subheader, IconButton } from 'material-ui';

const style = {
  margin: 12,
};
const columns = [
  {
    Header: 'ID',
    accessor: 'id', // String-based value accessors!
  },
  {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
  },
  {
    Header: 'Color code',
    accessor: 'color_code',
    Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Action',
    accessor: 'action', // String-based value accessors!
    Cell: row => (
      <div>
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
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
  if (loading) return <div>loading</div>;
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
        <ReactTable data={topics} columns={columns} defaultSorted={sorted} />
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
