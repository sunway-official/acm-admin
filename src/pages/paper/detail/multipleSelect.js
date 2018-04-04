import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RaisedButton } from 'material-ui';
import { graphql, compose } from 'react-apollo';
import { mutations } from '../helpers';

class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleSelectReviewers = this.handleSelectReviewers.bind(this);
  }

  handleChange = (event, index, values) => {
    let selectedItems = values.length;
    if (selectedItems < 4) {
      this.setState({ values: values });
    } else {
      console.log('too much');
    }
  };
  async handleSelectReviewers() {
    const { INSERT_PAPER_REVIEWER, UPDATE_PAPER } = this.props;
    try {
      await this.state.values.forEach(element => {
        INSERT_PAPER_REVIEWER({
          variables: {
            user_id: element,
            paper_id: this.props.paper_id,
          },
        });
      });
      UPDATE_PAPER({
        variables: {
          id: this.props.paper_id,
          paper_status_id: 5,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  menuItems(values) {
    let reviewers = [];
    this.props.reviewers.forEach(element => {
      let reviewer = { id: 0, name: '' };
      reviewer.id = element.user.id;
      reviewer.name = element.user.firstname + ' ' + element.user.lastname;
      reviewers.push(reviewer);
    });
    return reviewers.map(element => (
      <MenuItem
        key={element.id}
        insetChildren={true}
        checked={values && values.indexOf(element.id) > -1}
        value={element.id}
        primaryText={element.name}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <div className="paper-detail-select">
        <SelectField
          multiple={true}
          hintText="Select a name"
          value={values}
          onChange={this.handleChange}
          fullWidth={true}
        >
          {this.menuItems(values)}
        </SelectField>
        <RaisedButton
          className="btn save-change"
          label="Save Change"
          primary={true}
          type="submit"
          onClick={this.handleSelectReviewers}
          disabled={this.state.values.length > 0 ? false : true}
        />
      </div>
    );
  }
}

export default compose(
  graphql(mutations.INSERT_PAPER_REVIEWER, {
    name: 'INSERT_PAPER_REVIEWER',
    options: (user_id, paper_id) => ({
      variables: {
        user_id: user_id,
        paper_id: paper_id,
      },
    }),
  }),
  graphql(mutations.UPDATE_PAPER, {
    name: 'UPDATE_PAPER',
    options: id => ({
      variables: {
        id: id,
      },
    }),
  }),
)(MultipleSelect);
