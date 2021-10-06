import { Server } from 'socket.io';
import * as express from "express";
import { Engine, UpdateFnType } from './engine';
const path = require('path');
const http = require('http');

const app = express.default();
const server = http.createServer(app);
const io = new Server(server);

const moveSpeed = 100;
const updateFn: UpdateFnType = (state, inputs, dt) => {
    inputs.forEach(input => {
        if ('up' in input) { state.dir.up = input.up }
        if ('down' in input) { state.dir.down = input.down }
        if ('left' in input) { state.dir.left = input.left }
        if ('right' in input) { state.dir.right = input.right }
    });
    if (state.dir.up) state.y -= dt * moveSpeed;
    if (state.dir.down) state.y += dt * moveSpeed;
    if (state.dir.left) state.x -= dt * moveSpeed;
    if (state.dir.right) state.x += dt * moveSpeed;
}

const eng = new Engine(updateFn, io.emit.bind(io));
eng.start();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('input', (msg) => {
        eng.receiveInput(msg)
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Listening on: ${port}`);
});
