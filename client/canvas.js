import GameObject from './gameObject.js';
import vec from './Vec.js';
export default class renderer {
    #MainCanvas;
    #ctx;
    #canvasSize;
    #backgroundColor = '#FFFFFF';
    constructor() {
        this.#MainCanvas = document.createElement('canvas');
        this.#ctx = this.#MainCanvas.getContext('2d');
        this.#canvasSize = new vec(1600, 900);
        this.#MainCanvas.width = this.#canvasSize.x;
        this.#MainCanvas.height = this.#canvasSize.y;
        document.addEventListener('resize', ev => {
            this.scaleCanvas();
        })
        console.log('initialized canvas');
    }

    getCanvas() {
        return this.#MainCanvas;
    }

    scaleCanvas() {
        let w = window.innerWidth / this.#canvasSize.x;
        let h = window.innerHeight / this.#canvasSize.y;
        this.#MainCanvas.style.scale = w + ' ' + h;
    }

    render() {
        this.#clearRender();

        this.#ctx.fillStyle = 'black';
        GameObject.GameObjects.forEach(gameobject => {
            this.#ctx.fillRect((gameobject.position.x - gameobject.collider.x) * 10 + window.innerWidth / 2, (-gameobject.position.y - gameobject.collider.y) * 10 + window.innerHeight / 2, gameobject.collider.x * 20, gameobject.collider.y * 20);
        })
    }

    #clearRender() {
        this.#ctx.fillStyle = this.#backgroundColor;
        this.#ctx.fillRect(0, 0, this.#canvasSize.x, this.#canvasSize.y);
    }
}