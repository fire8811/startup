import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Home } from './home/home';
import { Instructions } from './instructions/instructions';
import { Leaderboard } from './leaderboard/leaderboard';
import { Play } from './play/play';
import { BrowserRouter } from 'react-router-dom';

export default function App(){
    return(
      <BrowserRouter>
        <div className="body bg-dark text-dark"> 
      
          <header className ="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
              <a className="navbar-brand" href="#">
                <img alt="Paint" src="Assets/pallette.png" width="50" />
                Huey!</a>
              <menu className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to=''>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='play'>Play</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='instructions'>Instructions</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='leaderboard'>Leaderboard</NavLink>
                </li>
              </menu>
            </nav>
          </header>
      
          <main>
            App goes here
          </main>
      
      
          <footer className="text-white">
            <div className="container-fluid">
              <span className="text-reset"> &copy;2025 Jenson J. </span>
              <a href = "https://github.com/fire8811/startup.git">(GitHub)</a>
              <a className="pallete-credit" href="https://www.vecteezy.com/free-png/paint-palette">Paint Palette PNGs by Vecteezy</a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    
    );
}