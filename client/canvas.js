import GameObject from './gameObject.js';
import vec from './Vec.js';
export default class renderer {
    #MainCanvas;
    #ctx;
    #canvasSize;
    #backgroundColor = '#6f6f6f';
    CAMERA = new vec(0, 0);
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
        
    }

    render() {
        this.#clearRender();

        this.#ctx.fillStyle = 'black';
        GameObject.GameObjects.forEach(gameobject => {
            
            this.#ctx.fillRect(gameobject.position.x * 10 - gameobject.collider.x * 10 + this.#canvasSize.x / 2 - this.CAMERA.x * 10, -gameobject.position.y * 10 - gameobject.collider.y * 10 + this.#canvasSize.y / 2 + this.CAMERA.y * 10, gameobject.collider.x * 20, gameobject.collider.y * 20);
        })
    }

    #clearRender() {
        this.#ctx.fillStyle = this.#backgroundColor;
        this.#ctx.fillRect(0, 0, this.#canvasSize.x, this.#canvasSize.y);
    }
}