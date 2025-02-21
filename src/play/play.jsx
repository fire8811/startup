import React from 'react';
import {Game} from './game'
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

        <Game/>
        </main>
    );
}