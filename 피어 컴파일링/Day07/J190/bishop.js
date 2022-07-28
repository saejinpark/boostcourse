const Piece = require("./piece.js");
class Bishop extends Piece{
    constructor(color,position){
        let movement=[[[1,1],[-1,1],[1,-1],[-1,-1]],1]
        super(color,position,1,'Bishop',movement,2)
        this.basicLocation = color?['C8','F8']:['C1','F1']
    }
    positionCheck(position){
        for(let x of this.basicLocation){
            if(position==x)return true
        }
        return false
    }
}
module.exports = Bishop;