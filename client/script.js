import Game from "./GameController.js";
import GameObject from "./gameObject.js";
import vec from "./Vec.js";

const game = new Game();
document.body.appendChild(game.Renderer.getCanvas());

const ground = new GameObject({ position: new vec(2, 3), collider: new vec(50, 3), hasGravity: false });
const player = new GameObject({ position: new vec(2, 10) });
new GameObject({ position: new vec(2, 14) });

var x = 0;

document.addEventListener('keydown', ev => {
    if (ev.key === 'd') x = 1;
    else if (ev.key === 'a') x = -1;
})

document.addEventListener('keyup', ev => {
    if (ev.key === 'd' && x == 1) {
        x = 0;
    }
    else if (ev.key === 'a' && x == -1) {
        x = 0;
    }
})

Game.addUpdateHook(() => {
    player.position.x += x * game.deltaTime;
});