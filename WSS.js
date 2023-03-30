const { WebSocketServer } = require('ws');;

export default class wss extends WebSocketServer {
    constructor(options) {
        super(options);
        this.register();
    }

    register() {
        this.on('connection', (ws, req) => {
            ws.on('open', () => {

            })
        })
    }
}