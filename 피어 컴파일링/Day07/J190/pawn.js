const Piece = require("./piece.js");
class Pawn extends Piece{
    constructor(color,position){
        let movement = color?[[[-1,0]],0]:[[[1,0]],0]
        super(color,position,0,'Pawn',movement,8)
        this.basicLocation = color?['A7','B7','C7','D7','E7','F7','G7','H7']:['A2','B2','C2','D2','E2','F2','G2','H2']
    }
    positionCheck(position){
        for(let x of this.basicLocation){
            if(position==x)return true
        }
        return false
    }
    upgrade(){
        super.movement = [[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],1]
        super.type = 3
        super.name = 'Queen'
    }
    upgradeCheck(){
        let destination = super.color?7:0
        if(super.getLocation()[0]==destination){
            this.upgrade()
            return true
        }
        return false
    }
}
module.exports = Pawn;