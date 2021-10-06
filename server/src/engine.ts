import { SimInputWrapper, SimState } from "../../shared/model";
import * as gameloop from 'node-gameloop';

export type UpdateFnType = (state: SimState, inputs: AugmentedSimInputWrapper[], dt: number) => void;
export interface AugmentedSimInputWrapper extends SimInputWrapper {
	source: string;
}

export class Engine {
	simState: SimState = {pcs: {}};
	private inputs: AugmentedSimInputWrapper[] = [];

	constructor(private updateFn: UpdateFnType, private stateCb: Function) {}

	start() {
		gameloop.setGameLoop((delta: number) => {
			this.updateFn(this.simState, this.inputs, delta);
			this.stateCb('state', this.simState);
			this.inputs = [];
		}, 100);
	}

	receiveInput(input: AugmentedSimInputWrapper) {
		this.inputs.push(input);
	}
}
