import React, {useState, useEffect} from 'react';
import './play.css';

export function Game(props){
    const [timer, updateTimer] = React.useState(10)
    const [score, updateScore] = React.useState(0);
    const [color, setColor] = React.useState('#000000');
    const [targetColor, changeTargetColor] = React.useState(getRandomColor());
    
    function resetGame(){
        updateTimer(10); //reset timer
        updateScore(0); //reset score
        changeTargetColor(getRandomColor);
    }
    function onChange(event){
        if (timer === 0) return;
        let newColor = event.target.value;
        setColor(newColor);
        
    }

    useEffect(() => {
        if (timer > 0){
            const interval = setInterval(() => {
                updateTimer((time) => time - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    function selectClick() { //
        if (timer === 0) return;
        updateIfMatch();
    }

    function updateIfMatch(){
        let playerColor = hexToRGB(color);
        //console.log("TARGET: " + targetColor); //color of target square
        //console.log("PLAYER: " + playerColor); //color of player square
        
        let playerRGB = getRgbArray(playerColor);
        let targetRGB = getRgbArray(targetColor);

        if(testColorEquality(targetRGB, playerRGB)){
            console.log("MATCH")
            updateScore(score+1);
            changeTargetColor(getRandomColor())

            //update targetColor
            //add points to scoreboard
        }
        else{
            console.log("NO MATCH");
        }
        //else:
        //print "WRONG COLOR"
        //console.log("GAME: " + testColorEquality(targetRGB, playerRGB));
        //console.log(targetColor == playerColor);
    }

    function hexToRGB(hexColor){
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        return ('rgb(' + r +',' + g + ',' + b +')');
        
    }

    function testColorEquality(target, player) {
        //console.log("IN_TEST_COLOR_EQUALITY")
        //console.log("TARGET_RGB: " + target);
        //console.log("PLAYER_RGB: " + player);

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

    function getRgbArray(rgb){
        let rgbArray = rgb.match(/\d+/g);
        for (let i = 0; i < 3; i++){
            rgbArray[i] = parseInt(rgbArray[i]);
        }

        return rgbArray;
    }

    function getRandomColor(){
        return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) +',' + Math.floor(Math.random() * 256) + ')';
    }

    return (
        <div className="center-content">
          <h3>Player_Name's Game</h3>
          <div id="card" className="demo-box">
            <div className="card border-0 shadow" style={{width:"400px"}}>
              <div className="card-body">
                <div className="game-info">
                  <div className="score">
                    Score: &nbsp;<span id="score-value">{score}</span>
                  </div>
                  <div className="time">
                    Time Remaining: &nbsp;<span id="time-remaining">{timer}</span>
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
                  <a href="#" className="btn btn-success" onClick={selectClick}>Select</a>
                  <a href="#" className="btn btn-secondary">Pause</a>
                  <a href="#" className="btn btn-danger" onClick={resetGame}>Reset</a>
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

