import React from 'react';
import '../app.css';

export function Unauthenticated(props) {
    const[username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    async function login() {
        localStorage.setItem('USERNAME', username);
        props.onLogin(username);
    }

    async function createUser() {
        localStorage.setItem('USERNAME', username);
        props.onLogin(username);
    }
    
    return (
        <div id="card" className="demo-box">
            <div className="card border-0 shadow" style={{width:"400px"}}>
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                    </div>
                    <div id="btn">
                        <a href="#" className="btn btn-primary" onClick={() => login()}>Login</a>
                        <a href="#" className="btn btn-outline-primary" onClick={()=> createUser()}>Sign up</a>
                    </div>
                
                </div>
            </div>
        </div>
    );
}