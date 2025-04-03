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
        console.log("Registering event handler");
        ggNotifier.addHandler(handleEvent);

        return () => {
          console.log("removing event handler");
          ggNotifier.removeHandler(handleEvent);
        };
      }, []);

      function handleEvent(event){
        console.log("handleEvent: " + event);
        setEvent((prevEvents) => [...prevEvents, event]);
      }

      function createMessageArray(){
        console.log("in createMessageArray");
        console.log(events.length);
        const messageArray = [];
        for (const [i, event] of events.entries()){
          console.log("event: " + event);
          if (event.type === 'system') {
            console.log("system message");
            const message = event.value.msg;
            console.log(message);
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

    function ggClick(){
        console.log("OK 0");
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        console.log("OK 1")
        setMsg(`${username} ${randomVerb} GG`)
        console.log("OK 2");
        ggNotifier.notify(username, 'gg', msg);
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