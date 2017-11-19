import React from 'react';
import { ME_QUERY } from './mutation';
import { graphql, compose } from 'react-apollo';

import GetAllConfs from './getAllConferences';

class ConfMgtSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { loading } = this.props.data;

    if (loading) return <div>loading...</div>;

    console.log(this.props.data.me.id);

    return (
      <div>
        <GetAllConfs id={this.props.data.me.id} />
      </div>
    );
  }
}

export default compose(graphql(ME_QUERY))(ConfMgtSidebar);
