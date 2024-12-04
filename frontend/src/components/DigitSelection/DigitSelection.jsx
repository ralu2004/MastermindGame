import React, { useState } from "react";
import './DigitSelection.css';

const DigitSelection = ({numberSelected, colors, descriptions, digitColors, setDigitColors}) => {
    
    const handleDigitClick = (index) => {
        const newDigitColors = [...digitColors];
        newDigitColors[index] = (newDigitColors[index] + 1) % 4;
        setDigitColors(newDigitColors);
    }
    if(numberSelected)
        return(
            <div className = "selection-container">
                <div style={{display: "flex", gap: "80px"}}>
                    {colors.map((color, index) => 
                        <div key = {index}>
                            <div style={{display: "inline-block", backgroundColor: color}} className = "circle">
                            </div>
                            <p style={{fontSize: "12px", display: "inline-block", color: color}}>
                                {descriptions[index]}
                            </p>
                        </div>
                    )}
                </div>
                <div style={{display: "flex", gap: "30px", justifyContent: "center"}}>
                    {digitColors.map((colorIndex, index) => 
                        <span key = {index} 
                            onClick = {() => handleDigitClick(index)}
                            style={{
                                cursor: 'pointer',
                                color: colors[colorIndex],
                                fontSize: '17px',
                                padding: '5px',
                                border: `1px solid ${colors[colorIndex]}`,
                                borderRadius: '4px',
                            }}>
                            {index}
                        </span>
                    )}
                </div>
            </div>
        );
    else
        return <div className = "selection-container"></div>
}

export default DigitSelection;