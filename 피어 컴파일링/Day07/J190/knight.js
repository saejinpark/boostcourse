const Piece = require("./piece.js");
class Knight extends Piece{
    constructor(color,position){
        let movement=[[[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]],0]
        super(color,position,4,'Knight',movement,2)
        this.basicLocation = color?['B8','G8']:['B1','G1']
    }
    positionCheck(position){
        for(let x of this.basicLocation){
            if(position==x)return true
        }
        return false
    }
}
module.exports = Knight;