const Piece = require("./piece.js");
class Rook extends Piece{
    constructor(color,position){
        let movement=[[[1,0],[-1,0],[0,1],[0,-1]],1]
        super(color,position,2,'Rook',movement,2)
        this.basicLocation = color?['A8','H8']:['A1','H1']
    }
    positionCheck(position){
        for(let x of this.basicLocation){
            if(position==x)return true
        }
        return false
    }
}
module.exports = Rook;