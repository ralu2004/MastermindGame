import React, {useState} from "react";
import axios from 'axios';
import './Background.css';
import PopUpStart from "../PopUpStartGame/PopUpStartGame";
import TakeGuess from "../PopUpTakeGuess/PopUpTakeGuess";
import DigitSelection from "../DigitSelection/DigitSelection";
import MoveList from "../MoveList/MoveList";
import PopUpWin from "../PopUpWin/PopUpWin";
import PopUpWaitingForOpponentMove from "../PopUpWaitingForOpponentMove/PopUpWaitingForOpponentMove";
import PopUpWaitingForComputer from "../PopUpWaitingForComputer/PopUpWaitingForComputer";
import Rules from "../Rules/Rules";
///import Instructions from "./Instructions";

const Background = ({gameId, setGameId, userId, resumeButtonDisabled, setResumeButtonDisabled}) => {
  const [displayPopUpWin, setDisplayPopUpWin] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [startCounter, setStartCounter] = useState(false);
  const [myNumber, setMyNumber] = useState(["", "", "", ""]);
  const [opponentNumber, setOpponentNumber] = useState(["?", "?", "?", "?"]);
  const [numberSelected, setNumberSelected] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [myMoveList, setMyMoveList] = useState([]);
  const [opponentMoveList, setOpponentMoveList] = useState([]);
  const [turn, setTurn] = useState(0);
  const [takeGuess, setTakeGuess] = useState(false);
  const [takeFinalGuess, setTakeFinalGuess] = useState(false);
  const [win, setWin] = useState(false);
  const [waitForComputer, setWaitForComputer] = useState(false);

  ///const colors = ["white", "red", "green", "yellow"];
  const colors = ["#C0C0C0", "#800020", "#556B2F", "#DAA520"];
  const descriptions = ["Unknown", "NiN", "Centered", "Guessed"];
  const [digitColors, setDigitColors] = useState(
    Array.from({length: 10}, () => 0)
  );

  const handleChange = (e, index, nr) => {
    let newDigits = [];
    if(nr === 0)
      newDigits = [...myNumber];
    else newDigits = [...opponentNumber];
    newDigits[index] = e.target.value;
    if(nr === 0)
      setMyNumber(newDigits);
    else setOpponentNumber(newDigits);
  }

  const handleFocus = (e, index) => {
    if (e.target.value.length === 1 && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && myNumber[index] === "") {
      if (index > 0) {
        document.getElementById(`digit-${index - 1}`).focus();
      }
    }
    if(e.key === "Enter"){
      if(myNumber[0] === "" || myNumber[1] === "" || myNumber[2] === "" || myNumber[3] === "" ||
        isNaN(myNumber[0]) || isNaN(myNumber[1]) || isNaN(myNumber[2]) || isNaN(myNumber[3]) ||
        myNumber[0] === myNumber[1] || myNumber[0] === myNumber[2] || myNumber[0] === myNumber[3] ||
        myNumber[1] === myNumber[2] || myNumber[1] === myNumber[3] || myNumber[2] === myNumber[3]){
      }
      else{
        const urlStartGame = `https://centered-game-0-0-1-1.onrender.com/api/game`
        let nr = ""
        nr = nr + myNumber[0] + myNumber[1] + myNumber[2] + myNumber[3];
        const newGame = {
          myNumber: nr,
          userId: userId
        }
        setWaitForComputer(true);
        axios.post(urlStartGame, newGame)
             .then((response) => {
                setGameId(response.data);
                setNumberSelected(true);
                setIsInputDisabled(true);
                setWaitForComputer(false);
             }) 
             .catch((error) => {
                console.log(error)
             })
      }
    }
  }

  const handleTakeGuess = () => {
    setTakeFinalGuess(false);
    setTakeGuess(true);
  }
  
  const handleTakeFinalGuess = () => {
    setTakeGuess(true);
    setTakeFinalGuess(true);
  }

  return (
    <div className="background">
        <PopUpStart isPopUpOpen={isPopUpOpen} setIsPopUpOpen={setIsPopUpOpen} isGameInProgress={isGameInProgress} setIsGameInProgress={setIsGameInProgress} startCounter={startCounter} setStartCounter={setStartCounter} setMyMoveList={setMyMoveList} setOpponentMoveList={setOpponentMoveList} setMyNumber={setMyNumber} setDigitColors={setDigitColors} setOpponentNumber={setOpponentNumber} gameId = {gameId} setNumberSelected={setNumberSelected} setIsInputDisabled={setIsInputDisabled} resumeButtonDisabled={resumeButtonDisabled} setResumeButtonDisabled={setResumeButtonDisabled} setTurn={setTurn}/>
        <TakeGuess takeGuess={takeGuess} setTakeGuess={setTakeGuess} takeFinalGuess={takeFinalGuess} setTakeFinalGuess={setTakeFinalGuess} turn={turn} setTurn={setTurn} moveList={myMoveList} setMoveList={setMyMoveList} gameId={gameId} setIsGameInProgress={setIsGameInProgress} displayPopUpWin={displayPopUpWin} setDisplayPopUpWin={setDisplayPopUpWin} setWin={setWin}/>
        {displayPopUpWin && <PopUpWin displayPopUpWin={displayPopUpWin} setDisplayPopUpWin={setDisplayPopUpWin} win={win} setIsPopUpOpen={setIsPopUpOpen} gameId={gameId}/>}
        {turn % 2 == 1 && win === false && <PopUpWaitingForOpponentMove turn={turn} setTurn={setTurn} opponentMoveList={opponentMoveList} setOpponentMoveList={setOpponentMoveList} gameId={gameId} setDisplayPopUpWin={setDisplayPopUpWin} setIsGameInProgress={setIsGameInProgress}/>}
        {waitForComputer && <PopUpWaitingForComputer />}
        <div className = "halvesContainer">
            <div className = "halfContainer">

                <h1 className="player">You</h1>
                <div className="player-number-you">
                  <div className="player-number-left">
                    <h4 className="player-number-text">Your number:</h4>
                    {myNumber.map((digit, index) => 
                      <input
                        className="digit-container"
                        key={index}
                        id={`digit-${index}`}
                        onChange={(e) => handleChange(e, index, 0)}
                        onInput={(e) => handleFocus(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        type="text"
                        value={digit}
                        maxLength="1"
                        disabled={isInputDisabled}
                      />
                    )}
                  </div>

                  <div className="player-number-right">
                    {turn % 2 === 0 ?
                      <div>
                        <button
                          className="button-bkg-guess"
                          onClick={handleTakeGuess}
                          disabled={!numberSelected}
                        >
                          Take guess
                        </button>
                        <button
                          className="button-bkg-final-guess"
                          onClick={handleTakeFinalGuess}
                          disabled={!numberSelected}
                        >
                          Take final guess
                        </button>
                      </div>
                      :
                      <h1 style={{ color: "#800020" }}>Opponent's turn</h1>
                    }
                  </div>
                </div>


                <hr/>
                <MoveList numberSelected={numberSelected} moveList={myMoveList} colors={colors} digitColors={digitColors}/>
                <hr/>
                <DigitSelection numberSelected={numberSelected} colors={colors} descriptions={descriptions} digitColors={digitColors} setDigitColors={setDigitColors}/>
            </div>
            <div className = "halfContainer">
                <h1 className="player"  style={{ paddingBottom: "10px" }}>Opponent</h1>
                
                <div className="player-number-opponent">
                  <div className="player-number-opponent-left">
                    <h4 className="player-number-text">Opponent's number:</h4>
                    {opponentNumber.map((digit, index) => 
                      <input
                        className="digit-container"
                        key={index}
                        id={`digit-${index}`}
                        onChange={(e) => handleChange(e, index, 1)}
                        onInput={(e) => handleFocus(e, index)}
                        type="text"
                        value={digit}
                        maxLength="1"
                        disabled={false}
                      />
                    )}
                  </div>
                </div>

                <hr/>
                <MoveList numberSelected={numberSelected} moveList={opponentMoveList} colors={["white"]} digitColors={Array.from({length: 10}, () => 0)}/>
                <hr/>
                <Rules/>
            </div>
        </div>
    </div>
  );
}

export default Background;

