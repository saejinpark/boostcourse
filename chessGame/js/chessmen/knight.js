import { Piece } from "./piece.js";

export class Knight extends Piece{
    constructor(color){
        super();
        this.setColor(color);
        this.setType("knight");
        this.setInner();
    }
}