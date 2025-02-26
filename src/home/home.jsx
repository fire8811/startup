import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import '../app.css';

export function Home({username, authState, onAuthChange}){
    console.log('Current authState:', authState);
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                {authState !== AuthState.Unknown && <h2> Welcome to Huey</h2>}
                {authState === AuthState.Authenticated && (
                    <Authenticated username={username} onLogout={()=> onAuthChange(username, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        username={username}
                        onLogin={(loginName) => {onAuthChange(loginName, AuthState.Authenticated);}}
                    />
                )}
            </div>
            
        </main>
    );

    
}