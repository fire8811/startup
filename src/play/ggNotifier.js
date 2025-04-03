class EventMessage {
    constructor(from, type, value){
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GGnotifier {
    events = []
    eventQueue = []
    handlers = []

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`)

        this.socket.onopen = (event) => {
            console.log("websocket connected");
            //this.notify('Huey', 'system', {msg: 'Connected to 4G (GGGG/Global GG Grid)'})
            this.notify(new EventMessage('Huey', 'system', {msg: 'Connected to 4G (GGGG/Global GG Grid)'}));

            this.connected = true;
        }
    };

    notify(event, type, msg){
        console.log("notifiy firing");
        //const data = { event, type, msg };
        const data = new EventMessage(event, type, msg);
        if(this.handlers.length === 0){
            console.log("no handlers");
            this.eventQueue.push(data);
            console.log(this.eventQueue);
        }
        else {
            console.log("notify handlers");
            this.handlers.forEach((h) => h({ event, type, msg }))
        }

        
    }

    addHandler(handler){
        console.log("addHandler fired: " + handler);
        this.handlers.push(handler);

        while (this.eventQueue.length > 0) {
            const queuedEvent = this.eventQueue.shift();
            handler(queuedEvent);
        }
    }

    removeHandler(handler){
        console.log("removeHandler fired");
        this.handlers = this.handlers.filter((h) => h !== handler);
    }
}

const ggNotifier = new GGnotifier();
export { ggNotifier }