import React from 'react';
import '../app.css';

export function Home(){
    return (
        <main className="container-fluid bg-secondary text-center">
            <h2> Welcome to Huey</h2>

            <div id="card" className="demo-box">
            <div className="card border-0 shadow" style={{width:"400px"}}>
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div id="btn">
                        <a href="#" className="btn btn-primary">Login</a>
                        <a href="#" className="btn btn-outline-primary">Sign up</a>
                    </div>
                
                </div>
            </div>
            </div>
            <form method="get" action="play.html"></form>
        </main>
    );
}