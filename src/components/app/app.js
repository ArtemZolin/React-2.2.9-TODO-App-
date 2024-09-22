/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {

  maxId =100;

  state = {
    todoData: [
      this.createTodoTask('Completed task', new Date('2024-09-21T10:00:00')),
      this.createTodoTask('Editing task', new Date('2024-09-21T10:00:00')),
      this.createTodoTask('Active task', new Date('2024-09-21T10:00:00')),
    ],
    filter: 'all',
  };
  
  addTask = (text) =>{
    const newItem = this.createTodoTask(text, Date.now())
    this.setState(({todoData}) =>{
      const newArr = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArr
      };
    });
  };

  onDeleted = (id) =>{
    this.setState(({todoData})=>{
      const idx = todoData.findIndex((el) => el.id===id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]
      return {
        todoData: newArray
      };
    });
  };

  onToggleCompleted = (id) =>{
    this.setState(({todoData}) => ({
      todoData: this.toggleProperty(todoData, id, 'completed')
    }));
  };

  clearCompleted = () => {
    for(const data of this.state.todoData){
      if (data.completed === true){
        this.onDeleted(data.id)
      };
    };
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  filter(items, filter){
    switch(filter){
    case 'all':
      return items;
    case 'active':
      return items.filter((item) =>!item.completed);
    case 'completed':
      return items.filter((item) =>item.completed);
    default:
      return items;
    };
  };
  
  createTodoTask(label, created){
    return {
      label,
      created,
      id: this.maxId++
    };
  };

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el)=> el.id===id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    return [
      ...arr.slice(0,idx),
      newItem, 
      ...arr.slice(idx+1)
    ]
  };

  render() {
    const {todoData, filter} = this.state;

    const visibleItems = this.filter(
      todoData, filter);

    const count = todoData.length - todoData
      .filter((el)=>el.completed).length;
    return( 
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded = {this.addTask}/>
        </header>
        <section className="main">
          <TaskList
            todos = {visibleItems}
            onToggleCompleted = {this.onToggleCompleted}
            onDeleted = {this.onDeleted}
          />
          <Footer 
            items = {count}
            clearCompleted = {this.clearCompleted}
            filter = {filter}
            onFilterChange = {this.onFilterChange} />
        </section>
      </section>)
  };
};
