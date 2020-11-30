import React, {Component} from 'react'
import Timer from './Timer';
import Task from './Task';
import './Pom.css';

export default class Pomodoro extends Component {
    
    constructor(props){
        super(props);
        // const testPom = [
        //     {description: "This is the first task", estimate: 3, completed: 0, done: false},
        //     {description: "A second, easier task", estimate: 1, completed: 0, done: false},
        //     {description: "Third task", estimate: 2, completed: 0, done: false},
        // ]

        this.state = {
            tasks: [],
            notes: ""
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

    addTask(){
        let newTask = document.getElementById("new-pom").value;
        let newEstimate = document.getElementById("new-estimate").value;
        let tasks = this.state.tasks.slice();
        tasks.push({
            description: newTask,
            estimate: Number(newEstimate),
            completed: 0,
            done: false
        });
        this.setState({tasks:tasks}, this.save);
        document.getElementById("new-pom").value = "";
        document.getElementById("new-estimate").value="1";
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
                    <NewTask onClick={() => this.addTask()}/>
                    <textarea placeholder="Enter notes here" id="pom-notes">
                      {this.state.notes}
                  </textarea>
                  <Save onClick={() => this.saveNotes()}/>
                 
                </div>
            
        )
      
    }

}

function Save(props){
    return(
        <button className="btn btn-reset btn-save" onClick={props.onClick}>
            Save
        </button>
    )
}

function NewTask(props){
    return(
        <div className="pomodoro-new">
            <input type="text" placeholder="Enter a task description" id="new-pom"></input>
            <select id="new-estimate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
            <button className="btn btn-reset" onClick={props.onClick}>Add Task</button>
        </div>
    )
}