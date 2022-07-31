import { Piece } from "./piece.js";

export class Bishop extends Piece {
    constructor(color) {
        super();
        this.setColor(color);
        this.setType("bishop");
        this.setInner();
    }
}
