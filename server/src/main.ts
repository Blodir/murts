const gameloop = require('node-gameloop');

console.log('Hello from server!');

let frameCount = 0;
const id = gameloop.setGameLoop((delta: number) => {
    // `delta` is the delta time from the last frame
    console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
}, 1000 / 2);
