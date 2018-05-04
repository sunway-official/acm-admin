import React, { Component } from 'react';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { mutations, queries } from '../helpers';
import { withRouter } from 'react-router';
import Form from '../form';
import { alertOptions, MyExclamationTriangle, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from 'components/render/renderLoading';
import '../style/style.css';
import { connect } from 'react-redux';
import S3 from 'lib/s3';

class Index extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);

    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.state = {
      url: '',
      key: '',
    };
  }

  async handleUploadFile(e) {
    const file = e.target.files[0];
    const fileName = file.name;
    // const hashedFile = await toBase64Async(file, 'pdf');
    const { Key } = await S3.putAsync({
      name: fileName,
      bodyFile: file,
      isImage: false,
    });
    this.setState({ key: Key });
    return Key;
  }

  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/papers');
      },
    });
  };
  showAlertError = text => {
    this.msg.error(text, {
      type: 'error', // type of alert
      icon: <MyExclamationTriangle />,
    });
  };
  async handleAdd(values) {
    // author create paper: corresponding 1
    // choose corresponding : coresponding 1
    // do not choose corresponding : coresponding 3

    const key = this.state.key;
    let correspondingValue = 3;
    try {
      let paper;
      paper = await this.props.INSERT_PAPER({
        variables: {
          paper_status_id: 3,
          title: values.title,
          abstract: values.abstract,
          keywords: values.keywords,
          topic_id: values.topic,
          file: key,
        },
      });
      await this.props.INSERT_PAPER_TOPIC({
        variables: {
          paper_id: paper.data.insertPaper.id,
          topic_id: values.topic,
        },
      });

      await this.props.INSERT_PAPER_AUTHOR({
        variables: {
          paper_id: paper.data.insertPaper.id,
          user_id: this.props.data.me.id,
          corresponding: 1,
          author_organization: this.props.data.me.organization,
          author_street: values.street,
          author_city: values.city,
          author_country: values.country,
          author_zipcode: values.zipcode,
        },
      });

      await values.addAuthors.map(author => {
        if (author.corresponding === true) {
          correspondingValue = 2;
        } else {
          correspondingValue = 3;
        }
        if (author.firstname !== undefined && author.lastname !== undefined) {
          this.props.INSERT_PAPER_AUTHOR({
            variables: {
              paper_id: paper.data.insertPaper.id,
              topic_id: author.topic,
              corresponding: correspondingValue,
              author_name: author.firstname + ' ' + author.lastname,
              author_email: author.email,
              author_title: author.title,
              author_organization: author.organization,
              author_street: author.authorStreet,
              author_city: author.authorCity,
              author_country: author.authorCountry,
              author_zipcode: values.authorZipcode,
            },
          });
        } else {
          console.log('no other authors');
        }
        return 1;
      });

      this.showAlertSuccess();
    } catch (error) {
      // let temp = error.graphQLErrors[0].message;
      this.showAlertError('Submit paper fail');
    }
  }

  render() {
    const {
      loading,
      getTopicsOfConference,
    } = this.props.GET_TOPICS_OF_CONFERENCE;
    let topics;
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    if (loading) return <Loading />;
    return (
      <div className="conference">
        <Subheader className="subheader">Submit paper</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <Link to="/conference/papers">
            <span>Papers List</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Submit paper</span>
        </div>
        <Form
          onSubmit={this.handleAdd}
          topics={topics}
          handleUploadFile={this.handleUploadFile}
        />
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    return {
      conference: state.auth.currentUser.currentConference,
    };
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(mutations.INSERT_PAPER_TOPIC, {
    name: 'INSERT_PAPER_TOPIC',
  }),
  graphql(mutations.INSERT_PAPER, {
    name: 'INSERT_PAPER',
  }),
  graphql(mutations.INSERT_PAPER_AUTHOR, {
    name: 'INSERT_PAPER_AUTHOR',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.ME_QUERY),
)(Index);
