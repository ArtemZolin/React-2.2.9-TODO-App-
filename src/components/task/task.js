import React,{Component} from "react";
import './task.css';
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component{
    

  

  render () {
    const { 
      label,
      onToggleCompleted,
      onDeleted,
      completed,
      created } = this.props;

    let classNames = 'no-des';
    if (completed) {
      classNames += ' description';
    }
    return(
      <div className='view'>
        <input className="toggle"
          type = "checkbox"
          onClick = {onToggleCompleted}></input>
        <label>
          <span className={classNames}> {label} </span>
          <span className="created">created {formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button 
          className="icon icon-destroy"
          onClick={onDeleted}></button>
      </div>  
    );
  }
   
};

