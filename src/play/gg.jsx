import React from "react";
import './play.css';

export function GGnotification({user}){
    const username = user;
    const [msg, setMsg] = React.useState('...listening');

    React.useEffect(() => {
        setInterval(() => {
            const users = ['Calvin', 'Hobbes', 'SpacemanSpiff', 'SusieDerkins', 'TracerBullet'];
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const newMsg = `${randomUser} said GG`;
            setMsg(newMsg);

        }, 5000);
    })

    function ggClick(){
        setMsg(`${username} said GG`)
    }

    
    return(
        <div class="row-container">
            <div className="notification text-start">
              <div>{msg}</div>
            </div>
          
            <div id="btn">
              <a href="#" className="btn btn-primary" onClick={ggClick}>GG</a>
            </div>
          </div>
    );
}