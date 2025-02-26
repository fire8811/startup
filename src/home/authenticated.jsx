import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Authenticated(props){
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('USERNAME');
        props.onLogout();
    }

    return (
        <div id="btn">
            <a href="#" className="btn btn-success" onClick={() => navigate('/play')}>Play Game</a>
            <a href="#" className="btn btn-outline-primary" onClick={()=> logout()}>Logout</a>
        </div>
    )
}