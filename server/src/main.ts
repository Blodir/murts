const gameloop = require('node-gameloop');

console.log('Hello from server!');

const gameState = {
    x: 0,
    y: 0
};

let frameCount = 0;
const id = gameloop.setGameLoop((delta: number) => {
    // game logic
    // send state to users
}, 1000 / 2);
