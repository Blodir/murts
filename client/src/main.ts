import { SimInput, SimState } from '../../shared/model';
import { Engine, UpdateFnType } from './engine';
import { ConnectionManager } from './connection-manager';

const lerp = (a: number, b: number, t: number) => ((1 - t) * a + t * b);
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
canvas.style.backgroundColor = "#eeeeee"
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

const updateFn: UpdateFnType = (prevState: SimState, nextState: SimState, dt: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(lerp(prevState.x, nextState.x, dt), lerp(prevState.y, nextState.y, dt), 100, 100);
};

const eng = new Engine(updateFn.bind(this));
const scm = new ConnectionManager();

scm.connectEngine(eng);

const kd = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.code) {
        case 'ArrowUp':
            if (!kd.up) scm.sendSimInput({up: true});
            kd.up = true;
            break;
        case 'ArrowDown':
            if (!kd.down) scm.sendSimInput({down: true});
            kd.down = true;
            break;
        case 'ArrowLeft':
            if (!kd.left) scm.sendSimInput({left: true});
            kd.left = true;
            break;
        case 'ArrowRight':
            if (!kd.right) scm.sendSimInput({right: true});
            kd.right = true;
            break;
    }
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
    switch (event.code) {
        case 'ArrowUp':
            scm.sendSimInput({up: false});
            kd.up = false;
            break;
        case 'ArrowDown':
            scm.sendSimInput({down: false});
            kd.down = false;
            break;
        case 'ArrowLeft':
            scm.sendSimInput({left: false});
            kd.left = false;
            break;
        case 'ArrowRight':
            scm.sendSimInput({right: false});
            kd.right = false;
            break;
    }
});
