import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const positions = ['Moderator', 'Supporter', 'Ticket Checker'];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class Status extends Component {
  state = {
    values: [],
  };

  handleChange = (event, index, values) => this.setState({ values });

  menuItems(values) {
    return positions.map(position => (
      <MenuItem
        key={position}
        insetChildren={true}
        checked={values && values.indexOf(position) > -1}
        value={position}
        primaryText={position}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <SelectField
        multiple={true}
        hintText="Select a position"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}
