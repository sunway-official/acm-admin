import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import { paperActions } from 'store/ducks/paper';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { RaisedButton } from 'material-ui';
import { ActionNoteAdd } from 'material-ui/svg-icons';
import Topic from '../topic';
import DeletePaper from './deletePaper';
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
    this.handleDialog = this.handleDialog.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  state = {
    paper_id: 0,
  };
  styles = {
    margin: 10,
  };
  handleDialog(paper, paper_id) {
    this.setState({ paper_id: paper_id });
    this.props.setPaper(paper);
    this.props.setToggle();
  }
  handleEdit(paper) {
    this.props.setPaper(paper);
  }
  render() {
    const { loading, getPapersByConferenceID } = this.props.data;
    if (loading) return <div>Loading..</div>;
    let papers;
    if (getPapersByConferenceID) {
      papers = getPapersByConferenceID;
    }
    console.log(papers);
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        minWidth: 400,
        Cell: props => <div style={style}>{props.value}</div>,
      },

      {
        Header: 'Topic',
        minWidth: 200,
        accessor: '',
        Cell: props => (
          <div style={style}>
            <Topic paper={props.value} />
          </div>
        ),
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
                this.handleEdit(props.value);
              }}
              containerElement={
                <Link to={`/conference/paper/edit/${props.value.id}`} />
              }
            />
            <RaisedButton
              label="Delete"
              onClick={() => {
                this.handleDialog(props.value, props.value.id);
              }}
              style={styleBtn}
            />
          </div>
        ),
      },
    ];
    return (
      <div className="react-table">
        <ReactTable
          filterable
          data={papers}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={10}
          className="-striped -highlight"
          showPaginationTop
        />

        <DeletePaper id={this.state.paper_id} />
        <div className="d-flex save-btn btn-group">
          <Link to="/conference/paper/add">
            <RaisedButton
              icon={<ActionNoteAdd />}
              primary={true}
              label={'Add New Paper'}
            />
          </Link>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setPaper: paper => dispatch(paperActions.setPaper(paper)),
    setToggle: () => dispatch(paperActions.setToggle()),
  };
};
export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(queries.GET_PAPERS_BY_CONFERENCE_ID, {
    options: ownProps => ({
      name: 'GET_PAPERS_BY_CONFERENCE_ID',
      if(ownProps) {
        return {
          variables: {
            conference_id: ownProps.conference_id,
          },
        };
      },
    }),
  }),
)(Index);
