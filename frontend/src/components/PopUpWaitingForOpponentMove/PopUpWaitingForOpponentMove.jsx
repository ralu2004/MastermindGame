import React, {useState, useEffect} from "react";
import axios from "axios";
import './PopUpWaitingForOpponentMove.css';

const PopUpWaitingForOpponentMove = ({turn, setTurn, opponentMoveList, setOpponentMoveList, gameId, setDisplayPopUpWin, setIsGameInProgress}) => {
    let newMove = {};
    useEffect(() => {
        const timer = setTimeout(() => {
            const urlAddMove = `https://centered-game-0-0-1-1.onrender.com/api/game/${gameId}?turn=${turn}&guessedNumber=1234`;
            const newMoveList = [...opponentMoveList];
            axios.put(urlAddMove)
                .then((response) => {
                    newMove = {
                        digits: [response.data.guessedNumber[0], response.data.guessedNumber[1], response.data.guessedNumber[2], response.data.guessedNumber[3]],
                        centered: response.data.centered,
                        guessed: response.data.guessed
                    }
                    newMoveList.push(newMove);
                    setOpponentMoveList(newMoveList);
                    if(newMove.centered === 4){
                        const win = -1;
                        const urlEndGame = `https://centered-game-0-0-1-1.onrender.com/api/game?id=${gameId}&win=${win}`;
                        axios.put(urlEndGame)
                            .then((response) => {
                                setIsGameInProgress(false);
                                setDisplayPopUpWin(true);
                            })
                            .catch((error) => {
                                console.log("Could not end game!")
                            })
                    }
                    setTurn(turn + 1);
                })
                .catch((error) => {
                    console.log("Could not add move!")
                })
        }, 3000)
        return () => clearTimeout(timer);
    }, [])
    return (
        <div>
            <div className = "popUpStart">
                <strong style = {{fontSize: "25px", color: "#800020"}}>Waiting for opponent to play!</strong>
            </div>
            <div className = "hazyBackground"></div>
        </div>
    );
}

export default PopUpWaitingForOpponentMove;