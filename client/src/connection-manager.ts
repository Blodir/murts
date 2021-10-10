
import * as io from 'socket.io-client';
import { MoveInput, SimState } from '../../shared/model';
import { Engine } from './engine';

export class ConnectionManager {
	private socket = io.default();
	private ping = 50; // TODO GET ACTUAL REAL PING

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
						time: performance.now() - (this.ping / 2)
				});
		});
	}

	sendSimInput(input: MoveInput) {
		this.socket.emit('input', {
			type: 'move',
			data: input
		});
	}
}
