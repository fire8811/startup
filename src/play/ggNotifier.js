class Message {
    constructor(who){
        this.who = who;
    }
}

class Notifier {
    events = [];
    handlers = [];

    constructor() {
        //simulate messages
        const userName = 'A player';

    }

    broadcast(who){
        const event = new Message(who);
        this.receive(event);
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler){
        this.handlers.filter((h) => h!== handler);
    }

    receive(event){
        this.events.push(event);

        this.handlers.forEach((handler) => {
            handler(event);
        })
    };
}

const GGS = new Notifier();
export { GGS };