import { SimInput, SimState } from "../../shared/model";
import * as gameloop from 'node-gameloop';

export type UpdateFnType = (state: SimState, inputs: SimInput[], dt: number) => void;

export class Engine {
	simState: SimState = {x: 0, y: 0, dir: {up: false, down: false, left: false, right: false}};
	private inputs: SimInput[] = [];

	constructor(private updateFn: UpdateFnType, private stateCb: Function) {}

	start() {
		gameloop.setGameLoop((delta: number) => {
			this.updateFn(this.simState, this.inputs, delta);
			this.stateCb('state', this.simState);
			this.inputs = [];
		}, 100);
	}

	receiveInput(input: SimInput) {
		this.inputs.push(input);
	}
}
