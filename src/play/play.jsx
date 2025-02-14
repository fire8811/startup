import React from 'react';
import './play.css'
export function Play(){
    return (
        <main className="container-fluid bg-secondary text-center">
        <div className="notification text-start">
          <ul>
            <li className="player-name"> Calvin started a new game</li>
            <li className="player-name"> Hobbes scored 7</li>
            <li className="player-name"> Hobbes beat his high score!</li>
          </ul>
        </div>

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
                    <rect width="100" height="100" fill="red"/>
                  </svg>
                  <svg width="100" height="100">
                    <rect width="100" height="100" fill="blue"/>
                  </svg>
                </div>

                
                  <label for="color">Pick Color: </label>
                <div id="color-picker">
                  <input type="color" value="#ff350c" name="varColor" id="color" />
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
        </main>
    );
}