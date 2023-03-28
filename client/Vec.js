export default class vec {
    constructor(x = number, y = number) {
        this.x = x;
        this.y = y;
    }

    add(vector = vec) {
        return new vec(this.x + vector.x, this.y + vector.y)
    }

    subtract(vector = vec) {
        return new vec(this.x - vector.x, this.y - vector.y)
    }

    multiply(vector = vec) {
        return new vec(this.x * vector.x, this.y * vector.y)
    }
    divide(vector = vec) {
        return new vec(this.x / vector.x, this.y / vector.y)
    }



    normalize() { // funky math
        return new vec(this.x / this.mag(), this.y / this.mag());
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    fakeMag() {
        return this.x + this.y;
    }

    distance(other = vec) {
        let x = other.x - this.x;
        let y = other.y - this.y;
        return Math.sqrt(x * x + y * y);
    }

    fakeDistance(other = vec) {
        let x = Math.abs(other.x - this.x);
        let y = Math.abs(other.y - this.y);
        return x + y;
    }

    compare(other = vec) {
        return other.x === this.x && other.y === this.y;
    }

    isNaN() {
        return Number.isNaN(this.x) || Number.isNaN(this.y); // why does this have to be a thing what the fuuuuuuuuuuckkk??...
        // this proves that god is dead
        // js is shit
        // i want life end
    }
}