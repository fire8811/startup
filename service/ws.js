const { WebSocketServer } = require('ws');

function webSocket(httpServer){
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        //forward messages to all users (including sender)
        socket.on('message', function message(data) {
            socketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        //pong response
        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    //ping sender
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate;

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}

module.exports = { webSocket };