import React from "react";
import './MoveList.css';
import WaitSelectNumber from "../WaitSelectNumber/WaitSelectNumber";

const MoveList = ({numberSelected, moveList, colors, digitColors}) => {
    if(!numberSelected){
        return(
            <div className = "container">
                <WaitSelectNumber/>
            </div>
        );
    }
    return(
        <div className = "moveListContainer">
            <div>
                <h1 style = {{fontSize: "20px", color: "#C0C0C0"}}>Move History</h1>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <ul>
                    {moveList.map((value, index) => 
                    <div>
                        <p style={{fontSize: "20px", display: "inline-block"}}>{index + 1}---&gt;</p>&nbsp;&nbsp;&nbsp;
                        <li style={{display: "inline-block"}}>
                            <div style={{display: "inline-block"}}>
                                {value.digits.map((val, index) => 
                                    <span style = {{color: colors[digitColors[val]], border: `1px solid ${colors[digitColors[val]]}`}} className = "digitContainer2">
                                        {val}
                                    </span>
                                )}
                                <h3 style={{display: "inline-block", marginLeft: "20px", color: "#556B2F"}}>Centered: {value.centered}</h3>
                                <h3 style={{display: "inline-block", marginLeft: "20px", color: "#DAA520"}}>Guessed: {value.guessed}</h3>
                            </div>
                        </li>
                    </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MoveList;