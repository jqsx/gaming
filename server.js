const express = require('express');
const app = express();
const WSS = require('./WSS');
const WebSocketServer = new WSS({ port: 7777 });

app.use(express.static('./client'));
app.use(express.json());

app.listen(3000, () => {
    console.log(`Listen on 3000`);
});