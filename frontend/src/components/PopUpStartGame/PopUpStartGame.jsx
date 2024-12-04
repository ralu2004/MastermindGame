import React from "react";
import axios from "axios";
import './PopUpStartGame.css';
import Counter from "../CounterGameStart/CounterGameStart";

const PopUpStart = ({isPopUpOpen, setIsPopUpOpen, isGameInProgress, setIsGameInProgress, startCounter, setStartCounter, setMyMoveList, setOpponentMoveList, setMyNumber, setDigitColors, setOpponentNumber, gameId, setNumberSelected, setIsInputDisabled, resumeButtonDisabled, setResumeButtonDisabled, setTurn}) => {

    const handleButtonStart = () => {
        setTurn(0);
        setNumberSelected(false);
        setIsPopUpOpen(false);
        setIsGameInProgress(true);
        setStartCounter(true);
        setMyNumber(["", "", "", ""]);
        setIsInputDisabled(false);
        setMyMoveList([]);
        setOpponentMoveList([]);
        setDigitColors(Array.from({length: 10}, () => 0));
        setOpponentNumber(["?", "?", "?", "?"]);
    }

    const handleButtonResume = () => {
        const urlGetGame = `https://centered-game-0-0-1-1.onrender.com/api/game/${gameId}`
        axios.get(urlGetGame)
             .then((response) => {
                setMyNumber([response.data.myNumber[0], response.data.myNumber[1], response.data.myNumber[2], response.data.myNumber[3]])
                let newMoveList = [];
                response.data.myMoves.forEach(element => {
                    newMoveList.push({
                        digits: [element.guessedNumber[0], element.guessedNumber[1], element.guessedNumber[2], element.guessedNumber[3]],
                        centered: element.centered,
                        guessed: element.guessed
                    })
                });
                setMyMoveList(newMoveList);
                let opponentNewMoveList = [];
                response.data.opponentMoves.forEach(element => {
                    opponentNewMoveList.push({
                        digits: [element.guessedNumber[0], element.guessedNumber[1], element.guessedNumber[2], element.guessedNumber[3]],
                        centered: element.centered,
                        guessed: element.guessed
                    })
                });
                setOpponentMoveList(opponentNewMoveList);
             })
             .catch((error) => {
                console.log("Could not get game!")
             })
        
        setResumeButtonDisabled(true);
        setIsGameInProgress(true);
        setNumberSelected(true);
        setIsPopUpOpen(false);
        setIsInputDisabled(true);
        setStartCounter(true);
        setDigitColors(Array.from({length: 10}, () => 0));
        setOpponentNumber(["?", "?", "?", "?"]);
    }

    return(
        <div>
            <Counter startCounter={startCounter} setStartCounter={setStartCounter}/>
            {isPopUpOpen && 
            (<div className = "popUpStart">
                <h2 style ={{color: "white", margin: "0 0 20px"}}>Welcome!</h2>
                <button className = "buttonStart" onClick = {handleButtonStart}>
                    Start New Game
                </button>
                <button className = "buttonResume" onClick = {handleButtonResume} disabled = {resumeButtonDisabled}>
                    Resume Game
                </button>
            </div>)}
            {(isPopUpOpen || startCounter) &&
            (<div className = "hazyBackground"></div>)}
        </div>
    );
}

export default PopUpStart;
