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
            //this.receiveEvent(new EventMessage('Huey', 'system', {msg: 'Connected to 4G (GGGG/Global GG Grid)'}));

            this.connected = true;
        }

        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    };

    notify(from, type, value){
        console.log("notify firing");
        const event = new EventMessage(from, type, value)
        console.log("TYPE: " + event.type);
        this.socket.send(JSON.stringify(event));
        // console.log("notifiy firing");
        // //const data = { event, type, msg };
        // const data = new EventMessage(event, type, msg);
        // if(this.handlers.length === 0){
        //     console.log("no handlers");
        //     this.eventQueue.push(data);
        //     console.log(this.eventQueue);
        // }
        // else {
        //     console.log("notify handlers");
        //     this.handlers.forEach((h) => h({ event, type, msg }))
        // }

        
    }

    addHandler(handler){
        console.log("addHandler fired: " + handler);
        this.handlers.push(handler);
    }

    removeHandler(handler){
        console.log("removeHandler fired");
        console.log(this.handlers);
        this.handlers = this.handlers.filter((h) => h !== handler);
        console.log(this.handlers);
    }

    receiveEvent(event){
        this.events.push(event);
        console.log("received: " + event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const ggNotifier = new GGnotifier();
export { ggNotifier }