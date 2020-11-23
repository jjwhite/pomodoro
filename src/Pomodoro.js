import React, {Component} from 'react'
import Timer from './Timer';
import Task from './Task';
import './Pom.css';

export default class Pomodoro extends Component {
    
    constructor(props){
        super(props);
        const testPom = [
            {description: "This is the first task", estimate: 3, completed: 0, done: false},
            {description: "A second, easier task", estimate: 1, completed: 0, done: false},
            {description: "Third task", estimate: 2, completed: 0, done: false},
        ]

        this.state = {
            tasks: testPom,
            notes: "Enter Notes"
        };
    }

    saveNotes(){
        let notes = document.getElementById("pom-notes").value;
        this.setState({notes:notes}, this.save);
        
    }
    
    saveTask(idx, completed, done){
        let tasks = this.state.tasks.slice();

        tasks[idx].completed = completed;
        tasks[idx].done = done;

        this.setState({tasks:tasks}, this.save);
    }

    save(){
        localStorage.setItem('pomodoro', JSON.stringify(this.state));
    }

    render(){
        const todo = this.state.tasks.map((task, idx) => {
            return(
                <Task index={idx} taskDescription={task.description} estimatedPoms={task.estimate} onChange={(idx, completed, done) => this.saveTask(idx, completed, done) }/>
            )
        });

        return(
            
                <div className="poms">
                    {todo}
                    <textarea id="pom-notes">
                      {this.state.notes}
                  </textarea>
                  <Save onClick={() => this.saveNotes()}/>
                </div>
            
        )
      
    }

}

function Save(props){
    return(
        <button className="btn btn-reset" onClick={props.onClick}>
            Save
        </button>
    )
}