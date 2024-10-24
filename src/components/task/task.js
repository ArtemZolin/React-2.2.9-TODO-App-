/* eslint-disable react/no-unused-state */
import React,{Component} from "react";
import './task.css';
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component{
  state = {
    // min: this.props.minutes,
    // sec: this.props.seconds,
    // isCounting: this.props.isCounting,
  }
    

  // componentWillUnmount() {
  //   clearInterval(this.counterID);
  // }

  // minDecrement = () => {
  //   const { min,  } = this.state;
  //   if( min !==0  ){
  //     this.setState({
  //       min: min - 1,
  //       sec: 59,
  //     });
  //   }
    
  // };
  
  // secDecrement = () => {
  //   const { min, sec, isCounting,  } = this.state;
  //   const { onToggleCompleted} = this.props;

  //   if (min === 0 && sec === 0 && isCounting === true ) {
  //     onToggleCompleted();
  //     clearInterval(this.counterID);
  //     this.setState({
  //       isCounting: false,
  //     });
  //   }
  //   if (sec > 0 ) {
  //     this.setState({
  //       sec: sec - 1,
  //       isCounting: true,
  //     });
  //   } else {
  //     this.minDecrement();
  //   }
  // };

  // handlePause = (event) => {
  //   event.stopPropagation();
  //   this.setState({ isCounting: false });
  //   clearInterval(this.counterID);
  // };

  // handleStart = (event) => {
   
  //   event.stopPropagation();
  //   this.setState({ isCounting: true,
        
  //   });
  //   this.counterID = setInterval(() => {
  //     this.secDecrement();
  //   }, 1000);
     
  // };


  // resetTimer = () => {
  //   const {completed} =this.props
  //   if (completed){
  //     this.setState({ isCounting: false,
  //       min: 0,
  //       sec:0 
  //     });
  //   }
  // };

  render () {
    const { 
      
      label,
      onToggleCompleted,
      onDeleted,
      completed,
      created,
      onEditClick,
      startTimer,
      pauseTimer,
      isTimerOn,
      minutes,
      seconds,
        
      
    } = this.props;
    
    // const {min, sec,} =this.state
    // const {isCounting, classNameView} =this.state
    let classNames1 = 'toggle';
    let classNames = 'no-des';
    if (completed) {
      classNames += ' description';
      classNames1 += ' description';
      
    }

   
    

    const buttonTimer = !isTimerOn ? (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className="icon-play" onClick={startTimer} > </button>
    ) : (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className=" icon-pause" onClick={pauseTimer} > </button>
    );

   
    return(
      <div className='view'>

        <input className={classNames1}
          type = "checkbox"
          onMouseDown = {onToggleCompleted} 
          onClick = {this.resetTimer}
        ></input>

        <label>
          <span className={classNames}> {label} </span>
          {buttonTimer}
          <span className="timer">{minutes}:{seconds}</span>
          <span className="created">created {formatDistanceToNow(created)} ago</span>
        </label>

        <button className="icon icon-edit" onClick={onEditClick}></button>
        <button 
          className="icon icon-destroy"
          onClick={onDeleted}></button>
      </div>  
    );
  }
   
};

