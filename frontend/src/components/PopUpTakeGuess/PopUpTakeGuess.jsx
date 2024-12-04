import React, {useState} from "react";
import axios from "axios";
import './PopUpTakeGuess.css';

const TakeGuess = ({takeGuess, setTakeGuess, takeFinalGuess, setTakeFinalGuess, turn, setTurn, moveList, setMoveList, gameId, setIsGameInProgress, displayPopUpWin, setDisplayPopUpWin, setWin}) => {
    const [guessNumber, setGuessNumber] = useState(["", "", "", ""]);
    const handleButtonTake = () => {
        if(guessNumber[0] === "" || guessNumber[1] === "" || guessNumber[2] === "" || guessNumber[3] === "" ||
            isNaN(guessNumber[0]) || isNaN(guessNumber[1]) || isNaN(guessNumber[2]) || isNaN(guessNumber[3]) ||
            guessNumber[0] === guessNumber[1] || guessNumber[0] === guessNumber[2] || guessNumber[0] === guessNumber[3] ||
            guessNumber[1] === guessNumber[2] || guessNumber[1] === guessNumber[3] || guessNumber[2] === guessNumber[3]){
        }
        else{
            const newMoveList = [...moveList];
            let nr = "";
            nr = nr + guessNumber[0] + guessNumber[1] + guessNumber[2] + guessNumber[3];
            const urlAddMove = `https://centered-game-0-0-1-1.onrender.com/api/game/${gameId}?turn=${turn}&guessedNumber=${nr}`;
            let newMove;
            axios.put(urlAddMove)
                 .then((response) => {
                    newMove = {
                        digits: [response.data.guessedNumber[0], response.data.guessedNumber[1], response.data.guessedNumber[2], response.data.guessedNumber[3]],
                        centered: response.data.centered,
                        guessed: response.data.guessed
                    }
                    newMoveList.push(newMove)
                    setMoveList(newMoveList)
                    if(takeFinalGuess === true){
                        let win = 0;
                        let centeredGuessed = newMove.centered;
                        if(turn % 2 === 0){
                            if(centeredGuessed === 4){
                                win = 1;
                                setWin(true);
                            }
                            else{
                                win = -1;
                                setWin(false);
                            }
                        }
                        else{
                            if(centeredGuessed === 4){
                                win = -1;
                                setWin(false);
                            }
                            else{
                                win = 1;
                                setWin(true);
                            }
                        }
                        const urlEndGame = `https://centered-game-0-0-1-1.onrender.com/api/game?id=${gameId}&win=${win}`;
                        axios.put(urlEndGame)
                             .then((response) => {
                                setIsGameInProgress(false);
                                setDisplayPopUpWin(true);
                                 //setTurn(turn + 1);
                             })
                             .catch((error) => {
                                console.log("Could not end game!")
                             })
                    }
                    setTakeGuess(false);
                    setTakeFinalGuess(false);
                    setGuessNumber(["", "", "", ""]);
                    setTurn(turn + 1);
                 })
                 .catch((error) => {
                    console.log("Could not add move!")
                 })
        }
    }
    const handleButtonBack = () => {
        setTakeGuess(false);
        setTakeFinalGuess(false);
    }
    const handleChange = (e, index) => {
        const newDigits = [...guessNumber];
        newDigits[index] = e.target.value;
        setGuessNumber(newDigits);
      }
    
      const handleFocus = (e, index) => {
        if (e.target.value.length === 1 && index < 3) {
          document.getElementById(`digit-${index + 1}`).focus();
        }
      }
    
      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && guessNumber[index] === "") {
          if (index > 0) {
            document.getElementById(`digit-${index - 1}`).focus();
          }
        }
    }
    return(
        <div>
            {takeGuess &&
            (<div className = "popUpStart">
                {guessNumber.map((digit, index) => 
                    <input className = "digitContainer" key = {index} id = {`digit-${index}`}
                    onChange = {(e) => handleChange(e, index)} 
                    onInput= {(e) => handleFocus(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    type = "text" value = {digit} maxLength = "1"/>)}
                <br/><br/>
                <button style={{backgroundColor: takeFinalGuess === true ? "red" : "green"}} className = "buttonTake" onClick = {handleButtonTake}>
                    Take
                </button>
                <button className = "buttonBack" onClick = {handleButtonBack}>
                    Back
                </button>
             </div>)}
        </div>    
    );
}

export default TakeGuess;