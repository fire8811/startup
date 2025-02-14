import React from 'react';
import './instructions.css'

export function Instructions(){
    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="gameInstructions">
                <h2>How to Play</h2>
                <p>Huey is a game where you simply match the color between
            two squares! The Square on the left contains the target square,
            and using the color picker on the right, you can change the color
            of the right square until they match! Try to get as many matches
            as possible in under a minute!
                 </p>
            </div>
        </main>
    );
}