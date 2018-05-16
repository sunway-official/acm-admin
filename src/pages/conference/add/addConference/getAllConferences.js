import React from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL_CONFERENCES_BY_USER_ID_QUERY } from './../helpers/mutation';
import { graphql, compose, gql } from 'react-apollo';
import { List, ListItem } from 'material-ui';
import DeleteDialog from './deleteDialog';
import ContentSend from 'material-ui/svg-icons/content/send';
import {
  ActionSupervisorAccount,
  NavigationClose,
} from 'material-ui/svg-icons';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FloatingActionButton } from 'material-ui';
import { withRouter } from 'react-router-dom';
import style from '../style/style.css';
import Loading from 'components/render/renderLoading';
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
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  async handleSwitch(conference_id) {
    await this.props.SWITCH_CURRENT_CONFERENCE({
      variables: {
        conference_id: conference_id,
      },
      refetchQueries: [
        {
          query: ME_QUERY,
        },
      ],
    });
    const linkTo = '/conference/info';
    this.props.history.push(linkTo);
  }

  handleOpen(index) {
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

  render() {
    const { loading } = this.props.GET_ALL_CONFERENCES_BY_USER_ID_QUERY;
    if (loading) return <Loading />;
    const conferences = this.props.GET_ALL_CONFERENCES_BY_USER_ID_QUERY
      .getAllConferencesByUserID;
    let currentConferenceID = 0;
    if (this.props.ME_QUERY.me && this.props.ME_QUERY.me.currentConference)
      currentConferenceID = this.props.ME_QUERY.me.currentConference.id;
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
                <FloatingActionButton mini={true}>
                  <Link to={`/conference/add`}>
                    <ContentAdd
                      className="add-confs-btn"
                      onClick={this.props.handleCloseConference}
                    />
                  </Link>
                </FloatingActionButton>
              </span>
            }
          />

          <div name="conferences-sidebar">
            {// eslint-disable-next-line
            conferences.map((data, index) => {
              if (currentConferenceID !== data.conference.id) {
                return (
                  <List key={data.conference.id}>
                    <ListItem
                      onToggle={this.handleToggle}
                      primaryText={data.conference.title}
                      leftIcon={<ActionSupervisorAccount />}
                      initiallyOpen={false}
                      primaryTogglesNestedList={true}
                      nestedItems={[
                        <ListItem
                          key={1}
                          primaryText="Switch"
                          className="switch-text"
                          leftIcon={<ContentSend style={styles.smallIcon} />}
                          onClick={() => this.handleSwitch(data.conference.id)}
                        />,
                        <ListItem
                          key={2}
                          primaryText="Delete"
                          className="switch-text"
                          leftIcon={
                            <NavigationClose style={styles.smallIcon} />
                          }
                          onClick={() => this.handleOpen(data.conference.id)}
                        />,
                      ]}
                    />
                  </List>
                );
              }
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

const withRouterGetAllConfs = withRouter(GetAllConfs);

export const SWITCH_CURRENT_CONFERENCE = gql`
  mutation switchCurrentConference($conference_id: ID!) {
    switchCurrentConference(conference_id: $conference_id) {
      id
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      currentConference {
        id
      }
    }
  }
`;

export default compose(
  graphql(GET_ALL_CONFERENCES_BY_USER_ID_QUERY, {
    name: 'GET_ALL_CONFERENCES_BY_USER_ID_QUERY',
  }),
  graphql(SWITCH_CURRENT_CONFERENCE, {
    name: 'SWITCH_CURRENT_CONFERENCE',
  }),
  graphql(ME_QUERY, {
    name: 'ME_QUERY',
  }),
)(withRouterGetAllConfs);
