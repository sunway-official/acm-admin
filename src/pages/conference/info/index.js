import React, { PureComponent } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { connect } from 'react-redux';
import { conferenceOperations } from '../../../store/ducks/conference';

class Index extends PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getConferenceId(id);
  }
  render() {
    return (
      <div className="conference">
        <Subheader className="subheader"> Conference Information</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Conference Information</span>
        </div>
        <div className="dashboard content d-flex">
          <ConferenceInfo />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConferenceId: id => dispatch(conferenceOperations.getIdOperation(id)),
  };
};

export default connect(undefined, mapDispatchToProps)(Index);
