class EventMessage {
    constructor(from, type, value){
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class GGnotifier {
    observers = []
    events = []
    handlers = []

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`)

        this.socket.onopen = (event) => {
            console.log("websocket connected");
            this.notify('system', 'Connected to 4G (GGGG/Global GG Grid)')
            this.connected = true;
        }
    };

    notify(event, from, msg){
        this.observers.forEach((h) => h({ event, from, msg }))
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler){
        this.handlers.filter((h) => h !== handler);
    }
}

const ggNotifier = new GGnotifier();
export { ggNotifier }