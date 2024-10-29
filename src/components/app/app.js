/* eslint-disable react/sort-comp */
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
      this.createTodoTask('Completed task', new Date('2024-09-21T10:00:00'), 15,0 ),
      this.createTodoTask('Editing task', new Date('2024-09-21T10:00:00'), 15,0),
      this.createTodoTask('Active task', new Date('2024-09-21T10:00:00'), 15,0),
    ],
    filter: 'all',
    minutes: '',
    seconds: '',
    timerId: '',
    isTimerOn: false,

  };
        

  
  addTask = (label, minutes, seconds,timerId,isTimerOn) =>{
    const newItem = this.createTodoTask(label,  Date.now(), minutes, seconds,timerId,isTimerOn)
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
    this. clearTimer(id)
    this.setState(({todoData}) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
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
      return (items.filter((item) =>item.completed));
    default:
      return items;
    };
  };
  
  createTodoTask(label, created, minutes, seconds,timerId,isTimerOn ){
    let minValueNumber = +minutes;
    let secValueNumber = +seconds;

    if (secValueNumber >60 ){
      minValueNumber +=Math.trunc(secValueNumber/60)
      secValueNumber -= Math.trunc(secValueNumber/60)*60
    }
            
    return {
      label,
      created,
      id: this.maxId++,
      editing: false,
      minutes: Number(minValueNumber) ,
      seconds: Number(secValueNumber),
      timerId,
      isTimerOn

    };
  };

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el)=> el.id===id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [
      ...arr.slice(0,idx),
      newItem, 
      ...arr.slice(idx+1)
    ]
  };

  onEditClick = (id) => {
    this.setState(({ todoData }) => {
      const newDataStream = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            editing: true,
          };
        }
        return el;
      });
      return {
        todoData: newDataStream,
      };
    });
  };

  changeDescription = (id, label) => {
    this.setState(({ todoData }) => {
      const newDataStream = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label,
            compleeted: false,
            editing: false,
          };
        }
        return el;
      });
      return {
        todoData: newDataStream,
      };
    });
  };


  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  pauseTimer = (id) => {
    const { todoData } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    const index = todoData.findIndex((el) => el.id === id);
    
    const newTask = {
      ...task,
      timerId: clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    this.setState({
      todoData: newArray,
    });
  };

  clearTimer = (id)=>{
    const { todoData } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const index = todoData.findIndex((el) => el.id === id);
    const [task] = currentTask;    
    const newTask = {
      ...task,
      minutes: [0],
      seconds: [0],
      timerId:  clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    this.setState({
      todoData: newArray,
    });
  }


  startTimer = (id) => {
   
    const setTimer = setInterval(() => {
      const { todoData } = this.state;
      const currentTask = todoData.filter((todo) => todo.id === id);
      const index = todoData.findIndex((el) => el.id === id);
      const [task] = currentTask;
      if(Number(task.seconds)===1 &&Number(task.minutes) ===0 ){
        this.onToggleCompleted(id)
      }
      if(Number(task.seconds)===0 &&Number(task.minutes) ===0 ){
        clearInterval(task.timerId)
      } else {
        const newTask = {
          ...task,
          minutes: [
            Number(task.minutes) !== 0 && Number(task.seconds) === 0 ? Number(task.minutes) - 1 : Number(task.minutes),
          ],
          seconds: [Number(task.seconds) !== 0 ? Number(task.seconds) - 1 : '59'],
          timerId: [Number(task.minutes) === 0 && Number(task.seconds) === 1 ? clearInterval(task.timerId) : setTimer],
          isTimerOn: !(Number(task.minutes) === 0 && Number(task.seconds) === 1),
          completed: Number(task.minutes) === 0 && Number(task.seconds) === 1 ? true : null,
        };
      
        const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
        this.setState({
          todoData: newArray,
        });
      }
      console.log('выполняется')
    }, 1000);
    
 
  };



  render() {
    const {todoData, filter,minutes,seconds,timerId,isTimerOn} = this.state;
    const visibleItems = this.filter(
      todoData, filter);

    const count = todoData.length - todoData
      .filter((el)=>el.completed).length;
    return( 
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded = {this.addTask}
            minutes ={minutes}
            seconds ={seconds}
          
          />
        </header>
        <section className="main">
          <TaskList
            startTimer = {this.startTimer}
            pauseTimer = {this.pauseTimer}
            minutes ={minutes}
            seconds ={seconds}
            timerId={timerId}
            isTimerOn = {isTimerOn}
            todos = {visibleItems}
            onToggleCompleted = {this.onToggleCompleted}
            onDeleted = {this.onDeleted}
            onEditClick={this.onEditClick}
            onChangeDescription={this.changeDescription}
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
