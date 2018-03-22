import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { queries } from '../helpers';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton } from 'material-ui';
import { ActionNoteAdd } from 'material-ui/svg-icons';
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
    this.mapReviewer = this.mapReviewer.bind(this);
  }
  handleEdit(paper) {
    this.props.setPaper(paper);
  }
  mapReviewer(reviewers) {
    let result = '';
    reviewers.forEach((element, index) => {
      // eslint-disable-next-line
      if (index != reviewers.length - 1) {
        result = result + ' ' + element.reviewer_name + ', ';
      } else {
        result = result + ' ' + element.reviewer_name;
      }
    });
    return result;
  }
  render() {
    const role = localStorage.getItem('roles');
    const loadingListPaper = this.props.GET_PAPERS_BY_CONFERENCE_ID.loading;
    if (loadingListPaper) return <Loading />;
    let papers;
    let addPaperButton;
    papers = this.props.GET_PAPERS_BY_CONFERENCE_ID.getPapersByConferenceID;
    // eslint-disable-next-line
    if (role == 1 || role == 6) {
      addPaperButton = (
        <div className="d-flex justify-content-center save-btn btn-group">
          <Link to="/conference/paper/add">
            <RaisedButton
              style={{ marginTop: '20px' }}
              className="marginBottom"
              icon={<ActionNoteAdd />}
              primary={true}
              label={'Add New Paper'}
            />
          </Link>
        </div>
      );
    }
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        minWidth: 300,
        Cell: props => <div style={style}>{cutString(props.value, 41)}</div>,
      },
      {
        Header: 'Reviewer',
        minWidth: 200,
        accessor: 'reviewers',
        // eslint-disable-next-line
        show: role == 1 ? true : false,
        Cell: props => <div style={style}>{this.mapReviewer(props.value)}</div>,
      },
      {
        Header: 'Topic',
        minWidth: 150,
        accessor: 'topic_name',
        Cell: props => <div style={style}>{props.value}</div>,
      },
      // {
      //   Header: 'Status',
      //   minWidth: 150,
      //   accessor: 'status',
      //   Cell: props => <div style={style}>{props.value}</div>,
      // },
      {
        Header: 'Action',
        minWidth: 170,
        filterable: false,
        accessor: '',
        Cell: props => (
          <div style={style}>
            <RaisedButton
              label="View"
              primary={true}
              onClick={() => {
                this.handleEdit(props.value);
              }}
              containerElement={
                <Link to={`/conference/paper/edit/${props.value.id}`} />
              }
            />
            {// eslint-disable-next-line
            (role == 1 || role == 7) && // if user is an organizer or reviewer
            (props.value.status == 'reviewing' ||
              props.value.status == 're-reviewing') ? ( // and if paper status is reviewing or re-reviewing
              <RaisedButton label="Review" secondary={true} style={styleBtn} />
            ) : // eslint-disable-next-line
            role == 6 && // if user is an author
            (props.value.status == 'submitting' ||
              props.value.status == 're-submitting') ? ( // and if paper status is submitting or re-submitting
              <RaisedButton label="Submit" secondary={true} style={styleBtn} />
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
        {addPaperButton}
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
  // graphql(queries.GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID, {
  //   name: 'GET_PAPERS_WITH_AUTHOR_BY_CONFERENCE_ID',
  // }),
)(Index);
