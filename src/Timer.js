
import React, { Component } from 'react'
import Sound from 'react-sound'

export default class Timer extends Component {
    
    state = {
        minutes: this.props.min,
        seconds: this.props.sec,
    };

    resetTimer() {
        this.setState( {
            minutes: this.props.min,
            seconds: this.props.sec,
        });
   
    }

    startTimer(){
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    stopTimer(){
        clearInterval(this.myInterval)
        this.myInterval = null;
    }

    componentDidMount() {
        this.resetTimer();    
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    
    render() {
        const { minutes, seconds } = this.state
           
                if(minutes === 0 && seconds === 0){
                    return (<React.Fragment>
                        <h1>Time's Up!</h1>
                        <div className="btn-row">
                            <Reset onClick={() => this.resetTimer()}/>
                        </div> 
                    </React.Fragment>)
                }else{
                    return(<React.Fragment>
                        <h1>Time Remaining: <br/> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1> 
                        <div className="btn-row">
                            <Start onClick={()=>this.startTimer()}/>
                            <Stop onClick={()=>this.stopTimer()}/>
                            <Reset onClick={() => this.resetTimer()}/>
                        </div>
                    </React.Fragment>)
                }

    }
}


function Reset(props){
    return(
        <button className="btn btn-reset" onClick={props.onClick}>
            Reset
        </button>
    )
}

function Stop(props){
    return(
        <button className="btn btn-stop" onClick={props.onClick}>
            Stop
        </button>
    )
}

function Start(props){
    return(
        <button className="btn btn-start" onClick={props.onClick}>
            Start
        </button>
    )
}

