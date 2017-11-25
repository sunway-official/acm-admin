import React from 'react';
import { ME_QUERY } from './helpers/mutation';
import { graphql, compose } from 'react-apollo';
import GetAllConfs from './addConference/getAllConferences';

// import GetAllConfs from './addConference/getAllConferences';

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

    if (this.props.data.me) return <GetAllConfs id={this.props.data.me.id} />;
    else return <div>Loading</div>;
  }
}

export default compose(graphql(ME_QUERY))(ConfMgtSidebar);
