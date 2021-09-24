const gameloop = require('node-gameloop');
const path = require('path');

import * as express from "express";
const app = express.default();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on: ${port}`);
});

const gameLoopStuff = () => {
    const gameState = {
        x: 0,
        y: 0
    };

    let frameCount = 0;
    const id = gameloop.setGameLoop((delta: number) => {
        // game logic
        // send state to users
    }, 1000 / 2);

}