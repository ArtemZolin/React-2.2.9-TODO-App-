import React, { Component } from 'react';
import './changeTaskForm.css';

export default class ChangeTaskForm extends Component {
  state = {
    newDescription: '',
  };

  static defaultProps = {
    description: '',
    onChangeDescription: () => {},
  };


  onDescriptionChange = (event) => {
    this.setState({
      newDescription: event.target.value.replace(/ +/g, ' ').trim(),
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
    const { description } = this.props;
    return (
      <input
        type="text"
        className="edite"
        placeholder= {description}
        onChange={this.onDescriptionChange}
        onKeyPress={this.onKeyPress}
      ></input>
    );
  }
}
