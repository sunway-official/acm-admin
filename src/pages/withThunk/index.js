import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { jsonplaceholderOperations } from '../../store/ducks/jsonplaceholder';

class WithThunk extends PureComponent {
  async componentDidMount() {
    await this.props.getAllPostsOperation();
  }
  render() {
    return (
      <ul>
        {this.props.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    );
  }
}

WithThunk.propTypes = {
  posts: PropTypes.array,
};

WithThunk.defaultProps = {
  posts: [],
};

const mapDispatchToProps = dispatch => ({
  getAllPostsOperation: bindActionCreators(
    jsonplaceholderOperations.getAllPostsOperation,
    dispatch,
  ),
});

const mapStateToProps = state => ({
  posts: state.jsonplaceholder.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(WithThunk);
