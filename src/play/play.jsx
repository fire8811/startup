import React from 'react';
import {Game} from './game'
import './play.css'
export function Play({user}){
    return (
        <main className="container-fluid bg-secondary text-center">
          <div class="row-container">
            
            <div className="notification text-start">
              <ul>
                <li className="player-name"> Calvin started a new game</li>
                <li className="player-name"> Hobbes scored 7</li>
                <li className="player-name"> Hobbes beat his high score!</li>
              </ul>
            </div>
          
            <div id="btn">
              <a href="#" className="btn btn-primary">GG</a>
            </div>
        
          </div>
        
        

        <Game user={user}/>
        
        
        </main>
    );
}