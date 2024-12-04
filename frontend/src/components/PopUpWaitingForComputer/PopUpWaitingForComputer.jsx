import React from "react";
import './PopUpWaitingForComputer.css';

const PopUpWaitingForComputer = () => {
    return(
        <div>
            <div className = "popUpStartComputer"> 
                <strong style = {{fontSize: "25px", color: "#800020"}}>Opponent is picking number!</strong>
                <div className="rotating-circle"></div>
            </div>
            <div className = "hazyBackground">

            </div>
        </div>
    );
}

export default PopUpWaitingForComputer;