import React, {useEffect} from 'react';
import './play.css';

export function Game({user}){
    const [pauseLabel, updatePause] = React.useState("Pause")
    const [colorLabel, updateLabel] = React.useState("\u00A0"); //API color name or wrong color warning
    const [canPlay, updateCanPlay] = React.useState(true); //game pause status
    const [gameStatus, setGameStatus] = React.useState(`${user}'s Game`);
    const [timer, updateTimer] = React.useState(90)
    const [score, updateScore] = React.useState(0);
    const [color, setColor] = React.useState('#000000');
    const [targetColor, changeTargetColor] = React.useState(getRandomColor());
    
    function resetGame(){
        updateTimer(90); //reset timer
        updateScore(0); //reset score
        changeTargetColor(getRandomColor);
        setGameStatus(`${user}'s Game`)
        updateLabel("\u00A0")
        updateCanPlay(true);
    }

    function pauseGame() {
        if (pauseLabel === "Pause"){
            updatePause("Resume");
            updateLabel("Game Paused")
            updateCanPlay(false);
            console.log(canPlay);
        }
        else if (pauseLabel === "Resume"){
            updatePause("Pause")
            updateLabel("\u00A0")
            updateCanPlay(true);
            console.log(canPlay);
        }
        
    }

    useEffect(() => { //make the colorLabel Wrong Color or API color display for about 2 seconds
        if(colorLabel != "\u00A0" && colorLabel != "Game Paused"){
            const timeShown = setTimeout(() => {
                updateLabel("\u00A0");
            }, 1500);

            return () => clearTimeout(timeShown);
        }
        
    }, [colorLabel]);

    useEffect(() => { //display GAME OVER when the timer reaches 0
        if (timer == 0){
            setGameStatus("GAME OVER");
            updateCanPlay(false);
        }
        
    }, [timer]);

    function onChange(event){ //changes the color square based on color picker input
        if (canPlay == false) return;
        let newColor = event.target.value;
        setColor(newColor);
        
    }

    useEffect(() => { //timer functionality 
        if (timer > 0 && canPlay == true){
            const interval = setInterval(() => {
                updateTimer((time) => time - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, canPlay]);

    function selectClick() { //select button to test color match
        if (canPlay == false) return;
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
            updateLabel("[API PROVIDED COLOR NAME HERE]")

            //update targetColor
            //add points to scoreboard
        }
        else{
            updateLabel("WRONG COLOR!");
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

        if ((rDiff <= 40) && (gDiff <= 40) && (bDiff <= 40)){
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
          <h3>{gameStatus}</h3>
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
                <h5>{colorLabel}</h5>


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
                  <a href="#" className="btn btn-secondary" onClick={pauseGame}>{pauseLabel}</a>
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

