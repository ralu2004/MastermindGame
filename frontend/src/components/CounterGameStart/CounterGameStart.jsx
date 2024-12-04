import React, {useState, useEffect} from "react";
import './CounterGameStart.css';

const Counter = ({startCounter, setStartCounter}) => {
    const [counter, setCounter] = useState(5);
    useEffect(() => {
        if(counter <= 0){
            setCounter(5);
            setStartCounter(false);
            return;
        }

        const timer = setTimeout(() => {
            if(startCounter === true)
                setCounter(counter => counter - 1);    
        }, 1000);

        return () => clearTimeout(timer);
        
    }, [counter, startCounter, setStartCounter])
    return (
        <div>
            {startCounter && 
            (<div className = "popUpCounter">
                <h2 style = {{color: "#C0C0C0", margin: "0 0 20px"}}>The game will start in: </h2>
                <h2 style = {{color: "#C0C0C0"}}>{counter}</h2>
            </div>)}
        </div>
    );
}

export default Counter;