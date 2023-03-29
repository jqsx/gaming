import renderer from "./canvas.js";
import GameObject from "./gameObject.js";

export default class Game {
    static MainGame;
    static #Updates = [];
    #canvas;
    static #MainThread;
    Renderer;
    deltaTime = 0;
    #lastUpdate = Date.now();
    constructor() {
        Game.MainGame = this;
        this.Renderer = new renderer();
        Game.addUpdateHook(() => {
            GameObject.UpdatePhysics();
            // this.Renderer.scaleCanvas();
            this.Renderer.render();
        });
        Game.#MainThread = setInterval(() => {
            this.#Update();
        }, 1000 / 60);
    }

    #Update() {
        this.deltaTime = (Date.now() - this.#lastUpdate) / 1000.0;
        this.#lastUpdate = Date.now();
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