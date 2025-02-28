import React from 'react';
import {Game} from './game';
import {GGnotification} from './gg';
import './play.css';

export function Play({user}){
    return (
        <main className="container-fluid bg-secondary text-center">
          <GGnotification user={user}/>
          <Game user={user}/>
        </main>
    );
}