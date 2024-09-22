import React from "react";

import Task from "../task";

import './task-list.css'

function TaskList({todos, onToggleCompleted, onDeleted}) {

  const elements = todos.map((item)=>{
    const {id, ...itemProps} = item;
    return (
      <li className="completed" key = {id}>
        <Task 
          {...itemProps}
          onToggleCompleted = {()=> onToggleCompleted(id)}
          onDeleted = {() => onDeleted(id)}/>
      </li>
    )
  })
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
}

export default TaskList;


