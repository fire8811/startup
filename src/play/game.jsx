import React from 'react';
import './play.css';

export function Game(props){
    let score = 0;
    const [color, setColor] = React.useState('rgb(0, 0, 0)');
    const [targetColor, changeTargetColor] = React.useState(getRandomColor());

    function getRandomColor(){
        return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) +',' + Math.floor(Math.random() * 256) + ')';
    }
    
    function onChange(event){ 
        let newColor = event.target.value;
        setColor(newColor);
        updateTargetIfMatch(newColor);
    }

    function hexToRGB(hexColor){
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        return ('rgb(' + r +',' + g + ',' + b +')');
        
    }

    function testColorEquality(target, player) {
        console.log("IN_TEST_COLOR_EQUALITY")
        console.log("TARGET_RGB: " + target);
        console.log("PLAYER_RGB: " + player);

        let targetR = target[0]
        let targetG = target[1]
        let targetB = target[2]

        let playerR = player[0]
        let playerG = player[1]
        let playerB = player[2]

        let rDiff = Math.abs(playerR - targetR);
        let gDiff = Math.abs(playerG - targetG);
        let bDiff = Math.abs(playerB - targetB);
        //console.log([rDiff, gDiff, bDiff]);

        if ((rDiff <= 5) && (gDiff <= 5) && (bDiff <= 5)){
            return true;
        }
        
        return false;
        
        
    }

    function updateTargetIfMatch(playerColor){
        playerColor = hexToRGB(playerColor);
        console.log("TARGET: " + targetColor); //color of target square
        console.log("PLAYER: " + playerColor); //color of player square
        
        let playerRGB = getRgbArray(playerColor);
        let targetRGB = getRgbArray(targetColor);        
        
        console.log("GAME: " + testColorEquality(targetRGB, playerRGB));
        console.log(targetColor == playerColor);
    }

    function getRgbArray(rgb){
        let rgbArray = rgb.match(/\d+/g);
        for (let i = 0; i < 3; i++){
            rgbArray[i] = parseInt(rgbArray[i]);
        }

        return rgbArray;
    }

    return (
        <div className="center-content">
          <h3>Player_Name's Game</h3>
          <div id="card" className="demo-box">
            <div className="card border-0 shadow" style={{width:"400px"}}>
              <div className="card-body">
                <div className="game-info">
                  <div className="score">
                    Score: &nbsp;<span id="score-value">00</span>
                  </div>
                  <div className="time">
                    Time Remaining: &nbsp;<span id="time-remaining">60s</span>
                  </div>
                </div>
                <h5> [API PROVIDED COLOR NAME HERE]</h5>


                <div className="squares">
                    <svg width="100" height="100">
                        <rect width="100" height="100" fill={targetColor}/>
                    </svg>

                    <SelectorSquare chosenColor={color}/>
                </div>

                
                <label for="color">Pick Color: </label>
                <div id="color-picker">
                  <input type="color" onChange={onChange} value={color} />
                </div>
                
                <div id="btn">
                  <a href="#" className="btn btn-success">Select</a>
                  <a href="#" className="btn btn-secondary">Pause</a>
                  <a href="#" className="btn btn-danger">Reset</a>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    );
}

function SelectorSquare({chosenColor}) {
    return (
        <svg width="100" height="100">
            <rect width="100" height="100" fill={chosenColor}/>
        </svg>
    );
}

function TargetSquare({}) {
    return (
        <svg width="100" height="100">
            <rect width="100" height="100" fill={chosenColor}/>
        </svg>
    )
}