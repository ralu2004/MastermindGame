import React from 'react';
import './Rules.css'; 

const Rules = () => {
  return (
    <div className="rules-overlay">
        <h3 className="rules-title">Game Rules</h3>
        <ul className="game-rules-list">
          <li>Pick your 4 distinct digit number and press <strong>Enter</strong></li>
          <li>Guess the opponent's number faster than he guesses yours (use <strong>Take guess</strong>)... if you can:))</li>
          <li>You can see all your moves and the opponent's moves in the <strong>Move History</strong> section</li>
          <li>In the Draft section, you can highlight your findings</li>
          <li>When you're ready, press <strong>Take final guess</strong>... Be careful, you only have one chance</li>
          <li>Want to see your evolution? Go to the <strong>History</strong> section of the navbar</li>
          <li>You may choose to resume any unfinished game (Press <strong style={{color: "#04177a"}}>Resume</strong> twice) or delete the ones that you don’t like...</li>
        </ul>
      </div>
  );
};

export default Rules;
