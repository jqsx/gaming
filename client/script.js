import Game from "./GameController.js";
import GameObject from "./gameObject.js";
import vec from "./Vec.js";

const game = new Game();
document.body.appendChild(game.Renderer.getCanvas());

const ground = new GameObject({ position: new vec(0, -20), collider: new vec(160, 10), hasGravity: false, hasPhysics: false });
const wall = new GameObject({ position: new vec(5, -10), collider: new vec(1, 10), hasGravity: false, hasPhysics: false });
const player = new GameObject({ position: new vec(2, 10) });
new GameObject({ position: new vec(2, 14) });

var x = 0;

let a = false;

document.addEventListener('keydown', ev => {
    if (ev.key === 'd') x = 1;
    else if (ev.key === 'a') x = -1;
    if (ev.key === 'w') player.velocity.y = 10;
    if (ev.key === 'h') a = true;
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
    player.velocity.x += x * game.deltaTime * 5;
    if (a) {
        new GameObject({ position: new vec(0, 0) })
        a = false;
    }
});