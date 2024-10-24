import React, {Component} from "react";
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minValue: this.props.minutes,
    secValue: this.props.seconds
  }

  static defaultProps = {
    addNewItem: () => {},
  };

  onLabelChange = (e) => {
    
    if (e.target.value!==' '){
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onTaskAdded } = this.props;
    const { label, minValue, secValue } = this.state;

    if (label===''){
      this.setState({
        label:'Имя задачи не задано.'
      })
    }
    else {
      onTaskAdded(label, minValue, secValue);
      this.setState({
        label: '',
        minValue: '',
        secValue: ''
      });
    }
    
  };


  render(){
    const { label, minValue, secValue } = this.state;
    return (
      <form className="new-task-form"
        onSubmit={this.onSubmit}>
        <input 
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={label}></input>


        <input
          className="new-todo-form__timer"
          name="minValue"
          placeholder="Min"
          onChange={this.onLabelChange}
          value={minValue}
        />

        <input
          className="new-todo-form__timer"
          name="secValue"
          placeholder="Sec"
          onChange={this.onLabelChange}
          value={secValue}
        />
        <button type="submit" />
      </form>
    );
  };
}