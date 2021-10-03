import { SimState } from "../../shared/model";

interface AugmentedSimState {
    state: SimState,
    time: DOMHighResTimeStamp
}

export type UpdateFnType = (prevState: SimState, nextState: SimState, dt: number) => void;

export class Engine {
    private previousStates: AugmentedSimState[] = [];
    private running = false;

    constructor(private updateFn: UpdateFnType) {}

    receiveState(state: AugmentedSimState) {
        if (this.previousStates.length === 2) {
            this.previousStates.shift();
            this.previousStates.push(state);
        } else {
            this.previousStates.push(state);
        }
        if (this.previousStates.length === 2 && this.running === false) {
            this.running = true;
            window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    private loop() {
        // TODO: what happens if dt is > 1 ??? ie. the distance between packets is variable
        const dt = Math.min((performance.now() - this.previousStates[1].time) / (this.previousStates[1].time - this.previousStates[0].time), 2);
        
        this.updateFn(this.previousStates[0].state, this.previousStates[1].state, dt);
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
