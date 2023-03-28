import renderer from "./canvas.js";
import GameObject from "./gameObject.js";

export default class Game {
    static MainGame;
    static #Updates = [];
    #canvas;
    static #MainThread;
    Renderer;
    constructor() {
        Game.MainGame = this;
        this.Renderer = new renderer();
        Game.addUpdateHook(() => {
            GameObject.UpdatePhysics();
            this.Renderer.render();
        });
        Game.#MainThread = setInterval(() => {
            this.#Update();
        }, 1000 / 60);
    }

    #Update() {
        Game.#Updates.forEach(u => {
            if (u instanceof Function) {
                u();
            }
        });
    }

    static addUpdateHook(callback) {
        if (callback instanceof Function) {
            Game.#Updates.push(callback);
        }
        else throw new TypeError("Callback must be a function");
    }
}