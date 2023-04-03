import vec from "./Vec.js";

export default class GameObject {
    #id = crypto.randomUUID();
    static #LastPhysicsUpdate = Date.now();
    static GameObjects = [];
    static GameObjectsID = new Map();
    name = "";
    position = new vec(0, 0);
    velocity = new vec(0, 0);
    collider = new vec(1, 1);
    hasGravity = true;
    isSolid = true;
    hasPhysics = true;

    constructor(options) {
        if ("load" in options) {
            if ("name" in options.load) name = options.load.name;
            if ("position" in options.load) this.position = options.load.position;
            if ("collider" in options.load) this.collider = options.load.collider;
            if ("hasGravity" in options.load)
                this.hasGravity = options.load.hasGravity;
            if ("isSolid" in options.load) this.isSolid = options.load.isSolid;
            if ("hasPhysics" in options.load)
                this.hasPhysics = options.load.hasPhysics;
            if ("id" in options.load) this.id = options.load.id;
        } else {
            if ("name" in options) name = options.name;
            if ("position" in options) this.position = options.position;
            if ("collider" in options) this.collider = options.collider;
            if ("hasGravity" in options) this.hasGravity = options.hasGravity;
            if ("isSolid" in options) this.isSolid = options.isSolid;
            if ("hasPhysics" in options) this.hasPhysics = options.hasPhysics;
        }

        GameObject.GameObjectsID.set(this.#id, this);
        GameObject.GameObjects.push(this);
        console.log(`Initialized new GameObject: ${this.#id}`);
    }

    isColliding(other = GameObject) {
        let x =
            other.position.x - other.collider.x < this.position.x + this.collider.x &&
            other.position.x + other.collider.x > this.position.x - this.collider.x;
        let y =
            other.position.y - other.collider.y < this.position.y + this.collider.y &&
            other.position.y + other.collider.y > this.position.y - this.collider.y;
        return x && y;
    }

    _isCollidingX(other=GameObject) {
        return other.position.x - other.collider.x < this.position.x + this.collider.x &&
        other.position.x + other.collider.x > this.position.x - this.collider.x;
    }

    _isCollidingY(other=GameObject) {
        return other.position.y - other.collider.y < this.position.y + this.collider.y &&
        other.position.y + other.collider.y > this.position.y - this.collider.y;
    }


    UpdateVelocity(delta) {
        if (this.hasGravity && this.hasPhysics) this.velocity.y -= delta * 5;
    }

    UpdatePosition(delta) {
        if (!this.hasPhysics) return;
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
    }

    UndoUpdatePosition(delta) {
        if (!this.hasPhysics) return;
        this.position.x -= this.velocity.x * delta;
        this.position.y -= this.velocity.y * delta;
        this.velocity = new vec(0, 0);
    }

    ShouldCheck(other = GameObject) {
        return other.position.fakeDistance(this.position) < 2000;
    }

    static UpdatePhysics() {
        let delta = (Date.now() - this.#LastPhysicsUpdate) / 1000.0;
        this.#LastPhysicsUpdate = Date.now();
        if (delta >= 1) return;
        this.GameObjects.forEach((gameobject) => {
            if (!(gameobject instanceof GameObject)) return;
            let old = gameobject.position.clone();
            gameobject.UpdateVelocity(delta);
            gameobject.UpdatePosition(delta);
            if (gameobject.isSolid) {
                for (let i = 0; i < this.GameObjects.length; i++) {
                    if (!(this.GameObjects[i] instanceof GameObject)) continue;
                    if (gameobject === this.GameObjects[i] || !this.GameObjects[i].isSolid) continue;
                    else if (!gameobject.ShouldCheck(this.GameObjects[i])) continue;
                    else if (gameobject.isColliding(this.GameObjects[i])) {
                        //gameobject.UndoUpdatePosition(delta);
                        // let diff = old.subtract(gameobject.position);
                        // let diff = this.GameObjects[i].position.divide(this.GameObjects[i].collider).subtract(gameobject.position.divide(gameobject.collider));
                        let diff = old.subtract(gameobject.position.divide(this.GameObjects[i].collider));
                        if (Math.abs(diff.x) > Math.abs(diff.y)) {
                            gameobject.position.y = old.y;
                            gameobject.velocity.y *= -0.5;
                            if (gameobject._isCollidingY(this.GameObjects[i])) {
                                gameobject.position.x = old.x;
                                gameobject.velocity.x *= 0.5;
                            }
                        }
                        else {
                            gameobject.position.x = old.x;
                            gameobject.velocity.x *= 0.5;
                            if (gameobject._isCollidingX(this.GameObjects[i])) {
                                gameobject.position.y = old.y;
                                gameobject.velocity.y *= -0.5;
                            }
                        }
                        if (gameobject.isColliding(this.GameObjects[i])) gameobject.position = old.clone();
                    }
                }
            }
        });
    }
}
