import { Piece } from "./piece.js";

export class King extends Piece{
    constructor(color){
        super();
        this.setColor(color);
        this.setType("king");
        this.setInner();
    }
}