const innerGenerator = (type, color) => {
    const button = document.createElement("button");
    button.dataset.color = color;
    button.dataset.type = type;
    button.className = "button piece";
    const i = document.createElement("i");
    i.className = `fa-solid fa-chess-${type}`;
    button.appendChild(i);
    return button;
};

export class Piece {
    constructor() {
        this.type = null;
        this.color = null;
        this.inner = null;
        this.move = 0;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getInner() {
        return this.inner;
    }

    setInner() {
        this.inner = innerGenerator(this.getType(), this.getColor());
    }

    getMove() {
        return this.move;
    }
    addMove() {
        this.move++;
    }
}
