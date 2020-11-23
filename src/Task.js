import React, {Component} from 'react'
import Timer from './Timer';

function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function TaskDescription(props){
    return(
        <div
            className={
                props.isDone ? 'done' : 'active'
            } 
            onClick={props.onClick}>
            {props.taskDescription}
        </div>
    );
}

export default class Task extends Component{
     constructor(props){
        super(props);
        this.state = {
            checkboxes: Array(props.estimatedPoms).fill(""),
            description: props.taskDescription,
            completed: 0,
            done: false,
            index: props.index,
            onChange: props.onChange
        };
     }

    boxClick(i){
        const boxes = this.state.checkboxes.slice(0,this.state.checkboxes.length);
        boxes[i] = "X";
        let completed = this.state.completed +1
        this.setState({
            checkboxes: boxes,
            completed: completed,
        })

        this.state.onChange(this.state.index, completed, this.state.done);

    } 

    renderCheckbox(i) {
        return (
          <Square
            value={this.state.checkboxes[i]}
            onClick={() => this.boxClick(i)}
          />
        );
      }

      completeTask(){
          this.setState({
              done:true
          })

          this.state.onChange(this.state.index, this.state.completed, true);
      }

      render(){
          return (
              <div className="pomodoro-task">
                  <TaskDescription  taskDescription={this.props.taskDescription} isDone={this.state.done} onClick={()=>this.completeTask()}/>
                  <div className="task-row">
                      {
                          this.state.checkboxes.map((status, index) => (
                            this.renderCheckbox(index)
                          ))
                          
                        }
                  </div>
              </div>
          )
      }
}