import vec from "./Vec.js";

export default class GameObject {
    static #LastPhysicsUpdate = Date.now();
    static GameObjects = [];
    name = "";
    position = new vec(0, 0);
    velocity = new vec(0, 0);
    collider = new vec(1, 1);
    hasGravity = true;
    isSolid = true;

    constructor(options) {
        if (options["name"]) name = options.name;
        if (options["position"]) this.position = options.position;
        if (options["collider"]) this.collider = options.collider;
        if (options["hasGravity"]) this.hasGravity = options.hasGravity;
        if (options["isSolid"]) this.isSolid = options.isSolid;
        GameObject.GameObjects.push(this);
    }

    isColliding(other=GameObject) {
        let x = other.prototype.position.x - other.prototype.collider.x < this.position.x + this.collider.x && other.prototype.position.x + other.prototype.collider.x > this.position.x - this.collider.x;
        let y = other.prototype.position.y - other.prototype.collider.y < this.position.y + this.collider.y && other.prototype.position.y + other.prototype.collider.y > this.position.y - this.collider.y;
        return x && y;
    }

    UpdateVelocity(delta) {
        if (this.hasGravity) this.velocity.y -= delta * 5;
    }

    UpdatePosition(delta) {
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
    }

    UndoUpdatePosition(delta) {
        this.position.x -= this.velocity.x * delta;
        this.position.y -= this.velocity.y * delta;
        this.velocity = new vec(0, 0);
    }

    static UpdatePhysics() {
        let delta = (Date.now() - this.#LastPhysicsUpdate) / 1000.0;
        this.#LastPhysicsUpdate = Date.now();

        this.GameObjects.forEach(gameobject => {
            gameobject.UpdateVelocity(delta);
            gameobject.UpdatePosition(delta);
            if (gameobject.isSolid) {
                for(let i = 0; i < this.GameObjects.length; i++) {
                    if (gameobject === this.GameObjects[i] || !this.GameObjects[i].isSolid) continue;
                    else if (gameobject.isColliding(this.GameObjects[i])) {
                        gameobject.UndoUpdatePosition(delta);
                        break;
                    }
                }
            }
        })
    }
}