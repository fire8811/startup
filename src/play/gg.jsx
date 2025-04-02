import React from "react";
import './play.css';
import { ggNotifier } from "./ggNotifier";

export function GGnotification({user, webSocket}){
    const username = user;
    const [msg, setMsg] = React.useState('');
    const verbs = [
        "said", "stated", "uttered", "voiced", "expressed", "declared", "remarked",  
        "noted", "mentioned", "added", "commented", "murmured", "whispered", "muttered",  
        "mumbled", "hissed", "sighed", "grumbled", "groaned", "breathed", "exclaimed",  
        "shouted", "yelled", "screamed", "shrieked", "howled", "roared", "barked",  
        "thundered", "bellowed", "wailed", "cried", "gasped", "blurted",  
        "snapped", "snarled", "demanded", "argued", "protested", "insisted",  
        "countered", "interjected", "inquired", "questioned", 
        "cheered", "gushed", "chimed", "beamed", "laughed", "grinned", "encouraged",  
        "congratulated", "enthused", "exclaimed", 
        "joked", "teased", "chirped", "sang", "warbled", "trilled", "bubbled",  
        "radiated", "applauded", "hailed", "exulted", "rejoiced", "proclaimed", "boasted",  
        "bragged", "chuckled", "giggled", "snickered", "smiled", 
         "exclaimed joyfully", "exuberated", "whooped", 
        "squealed", 
      ];

      const [events, setEvent] = React.useState([]);

      React.useEffect(()=>{
        ggNotifier.addHandler(handleEvent);

        return () => {
          ggNotifier.removeHandler(handleEvent);
        }
      });

      function handleEvent(event){
        setEvent([...events, event]);
      }

      function createMessageArray(){
        const messageArray = [];
        for (const [i, event] of events.entries()){
          if (event.type === 'system') {
            message = event.value.msg;
          }

          messageArray.push(
            <div key={i} className='event'>
              <span className={'player-event'}>{event.from[0]}</span>
              {message}
            </div>
          );
        }
        return messageArray;

      }

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         const users = ['Calvin', 'Hobbes', 'SpacemanSpiff', 'SusieDerkins', 'TracerBullet'];
            
    //         const randomUser = users[Math.floor(Math.random() * users.length)];
    //         const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    //         const newMsg = `${randomUser} ${randomVerb} GG`;
    //         setMsg(newMsg);

    //     }, 2000);

    //     return () => clearInterval(interval) //clear interval when component unmounts (ensures consistent timing between messages)
    // }, [])

    function ggClick(){
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        setMsg(`${username} ${randomVerb} GG`)
    }

    
    return(
        <div class="row-container">
            <div className="notification text-start">
              <div>{createMessageArray()}</div>
            </div>
          
            <div id="btn">
              <a href="#" className="btn btn-primary" onClick={ggClick}>GG</a>
            </div>
          </div>
    );
}