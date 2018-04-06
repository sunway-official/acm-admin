import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { queries } from '../helpers';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton } from 'material-ui';
import Loading from 'components/render/renderLoading';
import { cutString } from '../../../utils/stringSolve';

const style = {
  textAlign: 'center',
  lineHeight: '200%',
};

const styleBtn = {
  margin: '0px 10px',
};

const sorted = [
  {
    id: 'title',
    desc: false,
  },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: [],
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.mapAuthor = this.mapAuthor.bind(this);
  }
  handleEdit(paper) {
    this.props.setPaper(paper);
  }
  mapAuthor(authors) {
    let result = '';
    authors.forEach((element, index) => {
      // eslint-disable-next-line
      if (index != authors.length - 1) {
        result = result + ' ' + element.author_name + ', ';
      } else {
        if (index === 2) {
          result = result + '...';
        } else {
          result = result + ' ' + element.author_name;
        }
      }
    });
    return result;
  }
  render() {
    const role = localStorage.getItem('roles');
    const loadingListPaper = this.props.GET_PAPERS_BY_CONFERENCE_ID.loading;
    if (loadingListPaper) return <Loading />;
    let papers;
    papers = this.props.GET_PAPERS_BY_CONFERENCE_ID.getPapersByConferenceID; // get all paper by role
    const columns = [
      {
        Header: 'Id',
        accessor: '',
        minWidth: 50,
        Cell: props => <div style={style} />,
      },
      {
        Header: 'Title',
        accessor: 'title',
        minWidth: 250,
        Cell: props => <div style={style}>{cutString(props.value, 41)}</div>,
      },
      {
        Header: 'Authors',
        minWidth: 150,
        accessor: 'authors',
        // eslint-disable-next-line
        show: role == 1 ? true : false,
        Cell: props => <div style={style}>{this.mapAuthor(props.value)}</div>,
      },
      {
        Header: 'Topic',
        minWidth: 100,
        accessor: 'topic_name',
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Status',
        minWidth: 100,
        accessor: 'status',
        // eslint-disable-next-line
        show: role == 1 ? true : false,
        Cell: props => <div style={style}>{props.value}</div>,
      },
      {
        Header: 'Action',
        minWidth: 200,
        filterable: false,
        accessor: '',
        Cell: props => (
          <div style={{ textAlign: 'left', paddingLeft: '15%' }}>
            <RaisedButton
              label="View"
              default={true}
              onClick={() => {
                this.handleEdit(props.value);
              }}
              containerElement={
                <Link to={`/conference/paper/detail/${props.value.id}`} />
              }
            />
            {// eslint-disable-next-line
            (role === '1' || role === '6') && // if user is an organizer or reviewer
            (props.value.status === 'Reviewing' ||
              props.value.status === 'Re-reviewing') ? ( // and if paper status is reviewing or re-reviewing
              <RaisedButton label="Review" secondary={true} style={styleBtn} />
            ) : // eslint-disable-next-line
            role === '7' && // if user is an author
            (props.value.status === 'Submitting' ||
              props.value.status === 'Re-submitting') ? ( // and if paper status is submitting or re-submitting
              <RaisedButton
                label="Re-Submit"
                secondary={true}
                style={styleBtn}
              />
            ) : (
              ''
            )}
          </div>
        ),
      },
    ];
    return (
      <div className="react-table">
        <ReactTable
          // filterable
          data={papers}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={10}
          className="-striped -highlight"
          showPaginationTop
        />
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(queries.GET_PAPERS_BY_CONFERENCE_ID, {
    name: 'GET_PAPERS_BY_CONFERENCE_ID',
    options: ownProps => ({
      variables: {
        role_id: localStorage.getItem('roles'),
      },
    }),
  }),
)(Index);
