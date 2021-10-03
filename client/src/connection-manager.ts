
import * as io from 'socket.io-client';
import { SimInput, SimState } from '../../shared/model';
import { Engine } from './engine';

let ping = 50;

export class ConnectionManager {
	private socket = io.default();

	constructor() {
		this.socket.on('connect', () => {
				console.log(`connected: ${this.socket.id}`);
		});
		this.socket.on('disconnect', () => {
				console.log('disconnected');
		});
	}

	connectEngine(eng: Engine) {
		this.socket.on('state', (state: SimState) => {
				eng.receiveState({
						state,
						time: performance.now() - (ping / 2)
				});
		});
	}

	sendSimInput(input: SimInput) {
		this.socket.emit('input', input);
	}
}
