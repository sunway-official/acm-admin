import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
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
    topic_id: 0,
    papers: [],
  };
  styles = {
    margin: 10,
  };
  handleDialog(paper, paper_id, topic_id) {
    this.setState({ paper_id: paper_id, topic_id: topic_id });
    this.props.setPaper(paper);
    this.props.setToggle();
  }
  handleEdit(paper) {
    this.props.setPaper(paper);
  }

  componentWillMount() {
    const isAuthor = localStorage.getItem('roles').indexOf('7');
    if (isAuthor > -1) {
      this.props.client
        .query({
          query: queries.GET_PAPERS_BY_CONFERENCE_ID,
          variables: {
            isAuthor: 1,
          },
        })
        .then(value => {
          const { loading, data } = value;
          if (!loading) {
            const papers = data.getPapersByConferenceID;
            this.setState({
              papers: papers,
            });
          }
        });
    } else {
      this.props.client
        .query({
          query: queries.GET_PAPERS_BY_CONFERENCE_ID,
        })
        .then(value => {
          const { loading, data } = value;
          if (!loading) {
            const papers = data.getPapersByConferenceID;
            this.setState({
              papers: papers,
            });
          }
        });
    }
  }
  render() {
    // const { loading, getAllPapersByTopicID } = papers.data;
    // const {
    //   loading,
    //   getPapersByConferenceID,
    // } = this.props.GET_PAPERS_BY_CONFERENCE_ID;
    // if (loading) return <div>Loading..</div>;
    // let papers;
    // if (getPapersByConferenceID) {
    //   papers = getPapersByConferenceID;
    // }
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
              secondary={true}
              onClick={() => {
                this.handleDialog(
                  props.value,
                  props.value.id,
                  props.value.papersTopic[0].topic_id,
                );
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
          data={this.state.papers}
          columns={columns}
          defaultSorted={sorted}
          defaultPageSize={10}
          className="-striped -highlight"
          showPaginationTop
        />

        <DeletePaper id={this.state.paper_id} topic_id={this.state.topic_id} />
        <div className="d-flex save-btn btn-group">
          <Link to="/conference/paper/add">
            <RaisedButton
              className="marginBottom"
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
  withApollo,
  // graphql(queries.GET_PAPERS_BY_CONFERENCE_ID, {
  //   name: 'GET_PAPERS_BY_CONFERENCE_ID',
  // }),
)(Index);
