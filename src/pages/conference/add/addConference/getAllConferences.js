import React from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL_CONFERENCES_BY_USER_ID_QUERY } from './../helpers/mutation';
import { graphql, compose } from 'react-apollo';
import { List, ListItem } from 'material-ui';
import DeleteDialog from './deleteDialog';
// import { red500 } from 'material-ui/styles/colors';
import ContentSend from 'material-ui/svg-icons/content/send';
import {
  ActionSupervisorAccount,
  NavigationClose,
} from 'material-ui/svg-icons';
import AddDialog from './addDialog';
// import style from '../../../containers/layout/appbar/style.css';
import { style } from './../style/style.css';

const styles = {
  smallIcon: {
    width: 20,
    height: 20,
  },
};

class GetAllConfs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openToggle: false,
      openDialog: false,
      selectElement: 0,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggle = this.handleOpen.bind(this);
    this.handLinkClick = this.handLinkClick.bind(this);
  }

  handleOpen(index) {
    console.log(index);
    this.setState({
      openDialog: true,
      selectElement: index,
    });
  }

  handleClose = () => {
    this.setState({
      openDialog: false,
    });
  };

  handLinkClick() {
    window.location.reload();
  }

  render() {
    const { loading } = this.props.data;

    if (loading) return <div> loading... </div>;
    const conferences = this.props.data.getConferenceByUserID;
    console.log(this.props);

    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: style,
          }}
        />
        <List className="list">
          <ListItem
            className="item"
            primaryText="All Conferences"
            style={{
              fontSize: '20px',
            }}
            rightIcon={
              <span
                className="add-btn"
                style={{
                  margin: '4px 12px 24px',
                }}
              >
                <AddDialog onSubmit={this.insertConf} />
              </span>
            }
          />
          <div name="conferences">
            {conferences.map(conference => {
              return (
                <List key={conference.id}>
                  <ListItem
                    onToggle={this.handleToggle}
                    primaryText={conference.title}
                    leftIcon={<ActionSupervisorAccount />}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      <ListItem
                        key={1}
                        primaryText="Switch"
                        className="switch-text"
                        leftIcon={<ContentSend style={styles.smallIcon} />}
                        containerElement={
                          <Link to={`/conference/${conference.id}/info`} />
                        }
                        onClick={() => this.handLinkClick()}
                      />,
                      <ListItem
                        key={2}
                        primaryText="Delete"
                        leftIcon={<NavigationClose />}
                        onClick={() => this.handleOpen(conference.id)}
                      />,
                    ]}
                  />
                </List>
              );
            })}
          </div>
          <DeleteDialog
            isOpen={this.state.openDialog}
            handleClose={this.handleClose}
            id={this.state.selectElement}
            userId={this.props.id}
          />
        </List>
      </div>
    );
  }
}

export default compose(
  graphql(GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.id,
      },
    }),
  }),
)(GetAllConfs);
