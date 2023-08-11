import React from 'react'
import { useState, useEffect } from 'react';
import './Timer.css';

//displays 15 second countdown
const Timer = (props) => {
    const {initialMinute = 0,initialSeconds = 0, onEnd} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    onEnd();    //do i need UseEffect for this, signals when to start typing
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className="timerBox">
        { minutes === 0 && seconds === 0
            ? null
            : <h1 className="timerText"> Start in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;