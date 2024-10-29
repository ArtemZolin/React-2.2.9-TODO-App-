import React, { Component } from 'react';
import './changeTaskForm.css';

export default class ChangeTaskForm extends Component {
  state = {
    newDescription: this.props.description,
  };

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  };


  onDescriptionChange = (event) => {
    this.setState({
      newDescription: event.target.value.replace(/ +/g, ' '),
    });
  };

  onKeyPress = (event) => {
    const { onChangeDescription, id, description } = this.props;
    const { newDescription } = this.state;
    if (event.key === 'Enter') {
      if (newDescription === '') {
        onChangeDescription(id, description);
      } else {
        onChangeDescription(id, newDescription);
      }
    }
  };

  render() {
    const { newDescription } = this.state;
    return (
      <input
        type="text"
        className="edite"
        value={newDescription}
        onChange={this.onDescriptionChange}
        onKeyPress={this.onKeyPress}
        autoFocus
      ></input>
    );
  }
}
