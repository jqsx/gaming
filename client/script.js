import Game from "./GameController.js";
import GameObject from "./gameObject.js";
import vec from "./Vec.js";

const game = new Game();
document.body.appendChild(game.Renderer.getCanvas());

const ground = new GameObject({ position: new vec(2, 3), collider: new vec(50, 3), hasGravity: false });
const test = new GameObject({ position: new vec(2, 10) });

Game.addUpdateHook(() => {
    
});