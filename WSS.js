const { WebSocketServer } = require('ws');;

module.exports = class wss extends WebSocketServer {
    static Clients = new Map();
    constructor(options) {
        super(options);
        this.register();
    }

    register() {
        this.on('connection', (ws, req) => {
            ws.on('open', () => {
                wss.Clients.set(ws, { account: null, connectionToken: null })
            });

            ws.on('close', (code, reason) => {
                let s = reason.toJSON().data;
                console.log('Client disconnected from websocket server because of: ' + s);
                wss.Clients.delete(ws);
            });
        })
    }
}