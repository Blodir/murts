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
        if (input.type === 'join') {
            state.pcs[input.source] = {x: 0, y: 0, dir: {up: false, down: false, left: false, right: false}};
        }
        if (input.type === 'leave') {
            delete state.pcs[input.source];
        }
        if (input.type === 'move' && input.data) {
            if ('up' in input.data) { state.pcs[input.source].dir.up = input.data.up }
            if ('down' in input.data) { state.pcs[input.source].dir.down = input.data.down }
            if ('left' in input.data) { state.pcs[input.source].dir.left = input.data.left }
            if ('right' in input.data) { state.pcs[input.source].dir.right = input.data.right }
        }
    });
    Object.values(state.pcs).forEach(pc => {
        if (pc.dir.up) pc.y -= dt * moveSpeed;
        if (pc.dir.down) pc.y += dt * moveSpeed;
        if (pc.dir.left) pc.x -= dt * moveSpeed;
        if (pc.dir.right) pc.x += dt * moveSpeed;
    });
};

const eng = new Engine(updateFn, io.emit.bind(io));
eng.start();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    eng.receiveInput({
        type: 'join',
        source: socket.id
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        eng.receiveInput({
            type: 'leave',
            source: socket.id
        });
    });
    socket.on('input', (input) => {
        try {
            if (input.type === 'move') {
                eng.receiveInput({
                    ...input,
                    source: socket.id
                });
            }
        } catch (e) {
            console.log('Erroneous input received.');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Listening on: ${port}`);
});
