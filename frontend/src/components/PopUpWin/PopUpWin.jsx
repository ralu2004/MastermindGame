import React, {useState, useEffect} from "react";
import axios from "axios";
import './PopUpWin.css';

const PopUpWin = ({displayPopUpWin, setDisplayPopUpWin, win, setIsPopUpOpen, gameId}) => {
    const [ansOpponent, setAnsOpponent] = useState("");
    useEffect(() => {
        const urlGetGame = `https://centered-game-0-0-1-1.onrender.com/api/game/${gameId}`
        axios.get(urlGetGame)
            .then((response) => {
                setAnsOpponent(response.data.opponentNumber);
            })
            .catch((error) => {
                console.log("Could not get game");
            })
    }, [])
    const handleButtonStart = () => {
        setDisplayPopUpWin(false);
        setIsPopUpOpen(true);
    }
    return(
        <div>
            <div className = "popUpStartWin">
                <h1 style={{color: "white"}}>{win === true ? "You won!:))" : "You lost!:(("}</h1>
                <p style={{fontSize: "20px", color: "white"}}>Opponent`s number was: </p>
                    <p style = {{fontSize: "20px", color: "white"}}> {ansOpponent}</p>
                <button className = "buttonStart" onClick = {handleButtonStart}>
                    Back
                </button>
            </div>
            <div className = "hazyBackground"></div>
        </div> 
    );
}

export default PopUpWin;