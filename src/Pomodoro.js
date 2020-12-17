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
        this.summarize();
    }

    summarize(){
        let tasks = this.state.tasks.slice();
        let summary = {
            managerial : 0,
            technical : 0,
            administrative : 0,
            other: 0
        };

        this.state.tasks.map((task, idx) => {
            switch(task.category){
                case "managerial":
                    summary.managerial += (task.completed * 25);
                    break;
                case "technical":
                    summary.technical += (task.completed * 25);
                    break;
                case "administrative":
                    summary.administrative += (task.completed * 25);
                    break;
                case "other":
                    summary.other += (task.completed * 25);
                    break;
            }    
        });

        localStorage.setItem('pomodoro-summary', JSON.stringify(summary));
    }

    addTask(){
        let newTask = document.getElementById("new-pom").value;
        let newEstimate = document.getElementById("new-estimate").value;
        let newCategory = document.getElementById("new-category").value;
        let tasks = this.state.tasks.slice();
        tasks.push({
            description: newTask,
            estimate: Number(newEstimate),
            category: newCategory,
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
            <select id="new-category">
                <option value="technical">Technical</option>
                <option value="administrative">Administrative</option>
                <option value="managerial">Managerial</option>
                <option value="other">Other</option>
            </select>
            <button className="btn btn-reset" onClick={props.onClick}>+</button>
        </div>
    )
}