import React from 'react';
import './leaderboard.css'

export function Leaderboard(){
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
        <h3> Top Scores </h3>
        <ol>
          <li>
            <div class="score-name">Spaceman Spiff</div>
            <div class="score">15</div>
          </li>
          <li>
            <div class="score-name">Miss Wormwood</div>
            <div class="score">12</div>
          </li>
          <li>
            <div class="score-name">Susie Derkins</div>
            <div class="score">9</div>
          </li>
        </ol>
      </div>
        </main>
    );
}