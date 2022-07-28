const Piece = require("./piece.js");
class Queen extends Piece{
    constructor(color,position){
        let movement=[[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],1]
        super(color,position,3,'Queen',movement,1)
        this.basicLocation = color?['E8']:['E1']
    }
    positionCheck(position){
        for(let x of this.basicLocation){
            if(position==x)return true
        }
        return false
    }
    getTypeNum(){
        return this.maxNum
    }
}
module.exports = Queen;