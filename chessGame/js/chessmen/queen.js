import { Piece } from "./piece.js";

export class Queen extends Piece{
    constructor(color){
        super();
        this.setColor(color);
        this.setType("queen");
        this.setInner();
    }
}