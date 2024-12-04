import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyHistory.css";

const MyHistory = ({ userId, setGameId, resumeButtonDisabled, setResumeButtonDisabled }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const urlAllGames = `https://centered-game-0-0-1-1.onrender.com/api/user/get-by-id/${userId}`;
    axios
      .get(urlAllGames)
      .then((response) => {
        setGames(response.data.games);
      })
      .catch(() => {
        console.log("Could not get all games!");
      });
  }, [userId]); 

  const handleResume = (gameId) => {
    setGameId(gameId);
    setResumeButtonDisabled(false);
    navigate("/");
  };

  const handleDelete = (gameId) => {
    const urlDelete = `https://centered-game-0-0-1-1.onrender.com/api/game/${gameId}`;
    axios
      .delete(urlDelete)
      .then(() => {
        const updatedGames = games.filter((game) => game.id !== gameId);
        setGames(updatedGames);
      })
      .catch(() => {
        console.log("Could not delete game!");
      });
  };

  return (
    <div className="background2">
      {games.map((game) => (
        <div key={game.id} className="gameContainer">
          <div className="buttonSection">
            {game.winner === 0 ? (
              <button
                className="buttonResume"
                onClick={() => handleResume(game.id)}
              >
                <strong>RESUME</strong>
              </button>
            ) : (
              <button className="buttonView">
                <strong
                  style={{ color: game.winner === -1 ? "#800020" : "#556B2F" }}
                >
                  {game.winner === -1 ? "LOST :(" : "WON :))"}
                </strong>
              </button>
            )}
            <button
              className="buttonDelete"
              onClick={() => handleDelete(game.id)}
            >
              <strong>DELETE</strong>
            </button>
          </div>

          <div className="detailsSection">
            <div className="playerSection">
              <p>
                <strong>My Number:</strong> {game.myNumber}
              </p>
              <div>
                <strong>My Moves:</strong>
                {game.myMoves.map((move, idx) => (
                  <p key={idx}>
                    {move.guessedNumber}{" "}
                    <span className="centered">Centered: {move.centered}</span>{" "}
                    <span className="guessed">Guessed: {move.guessed}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="opponentSection">
              <div>
                <strong>Opponent Number:</strong> {game.winner !== 0 ? game.opponentNumber : "????"}
              </div>
              <div>
                <p>
                    <strong>Opponent Moves:</strong>
                </p>
                {game.opponentMoves.map((move, idx) => (
                  <p key={idx}>
                    {move.guessedNumber}{" "}
                    <span className="centered">Centered: {move.centered}</span>{" "}
                    <span className="guessed">Guessed: {move.guessed}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHistory;
