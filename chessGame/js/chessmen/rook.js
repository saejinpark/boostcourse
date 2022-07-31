import { Piece } from "./piece.js";

export class Rook extends Piece{
    constructor(color){
        super();
        this.setColor(color);
        this.setType("rook");
        this.setInner();
    }
}