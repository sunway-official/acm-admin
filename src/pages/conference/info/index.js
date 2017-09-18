import React from 'react';
import { TextField, DatePicker, TimePicker } from 'material-ui';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Google Showcase',
      description: 'Description',
      place: 'Duy Tan University',
    };
  }

  handleChange = event => {
    this.setState({
      title: event.target.title,
      description: event.target.description,
      place: event.target.place,
    });
  };

  render() {
    return (
      <div>
        <div>
          <TextField
            id="title-controlled"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            id="description-controlled"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            id="place-controlled"
            value={this.state.place}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TimePicker hintText="Time of Conference" autoOk={true} />
        </div>
        <div>
          <DatePicker hintText="Date of Conference" autoOk={true} />
        </div>
      </div>
    );
  }
}
