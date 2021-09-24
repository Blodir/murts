interface GameState {
    x: number,
    y: number
}

interface AugmentedGameState {
    state: GameState,
    time: DOMHighResTimeStamp
}

const lerp = (a: number, b: number, t: number) => ((1 - t) * a + t * b);
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

class Engine {
    private previousStates: AugmentedGameState[] = [];
    private running = false;

    receiveState(state: AugmentedGameState) {
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
        const dt = Math.min((performance.now() - this.previousStates[1].time) / (this.previousStates[1].time - this.previousStates[0].time), 1);
        
        this.update(this.previousStates[0].state, this.previousStates[1].state, dt);
        window.requestAnimationFrame(this.loop.bind(this));
    }
    
    private update(prevState: GameState, nextState: GameState, dt: number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillRect(lerp(prevState.x, nextState.x, dt), lerp(prevState.y, nextState.y, dt), 100, 100);
    }
}

const eng = new Engine();

eng.receiveState({
    state: {
        x: 0,
        y: 0
    },
    time: performance.now() - 100
});

eng.receiveState({
    state: {
        x: 10,
        y: 0
    },
    time: performance.now()
});
