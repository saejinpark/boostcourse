const Pawn = require("./pawn.js");
const Bishop = require("./bishop.js");
const Knight = require("./knight.js");
const Rook = require("./rook.js");
const Queen = require("./queen.js");
const PeiceSpawner = {'Pawn':Pawn,'Bishop':Bishop,'Knight':Knight,'Rook':Rook,'Queen':Queen}

//position = [rank,file]
//type = [name,color]
//color 0:흑 1:백

class Board{
    constructor(){
        this.pieces = []
        this.board = []
        this.pieceScores = {'Pawn':1,'Bishop':3,'Knight':3,'Rook':5,'Queen':9}
        this.file = ['A','B','C','D','E','F','G','H']
        this.initBoard()
        this.turn = 1
    }
    initBoard(){
        this.board.length = 8
        for(let x = 0;x < 8;x++)this.board[x]={'A':0,'B':0,'C':0,'D':0,'E':0,'F':0,'G':0,'H':0}
    }
    getRank(rank){
        let files = []
        for(let x = 0;x < 8;x++)files.push(this.board[rank][this.file[x]])
        return files
    }
    display(){
        let ranks = []
        for(let x = 0;x < 8;x++)ranks.push(this.getRank(x))
        return ranks
    }
    getScore(color){
        let score = 0
        for(let x of this.pieces){
            if(x.isColor(color)){
                score+=this.pieceScores[x.getName()]
            }
        }
        return score
    }
    getPosition(position){
        return this.board[position[0]][this.file[position[1]]]
    }
    pieceNumberCheck(type,maxNum){
        let num = 0
        for(let x of this.pieces)num+=((x.getName()==type[0])&&(x.getColor()==type[1]))
        return num>=maxNum
    }
    getStrPosition(position){
        return this.file[position[1]]+(position[0]+1)
    }
    initPiece(type, position){
        let piece = new PeiceSpawner[type[0]](type[1],position)
        if(!piece.positionCheck(this.getStrPosition(position))){
            throw 'initpositionError'
        }
        if(this.getPosition(position)){
            throw 'overlapError'
        }
        if(this.pieceNumberCheck(type,piece.getTypeNum())){
            throw 'pieceNumberError'
        }
        this.pieces.push(piece)
        this.board[position[0]][this.file[position[1]]] = type
    }
    setPiece(type,position){
        let piece = new PeiceSpawner[type[0]](type[1],position)
        if(this.getPosition(position)){
            throw 'overlapError'
        }
        this.pieces.push(piece)
        this.board[position[0]][this.file[position[1]]] = type
    }
    getPiece(location){
        let piece
        for(let x of this.pieces){
            if(this.getStrPosition(x.getLocation()) == this.getStrPosition(location))piece=x
        }
        return piece
    }
    pathTest(piece,location){
        let path = piece.getPath(location)
        for(let x of path){
            if(this.getPosition(x)){
                return false
            }
        }
        return true
    }
    removePiece(location){
        for(let x in this.pieces){
            if(this.getStrPosition(this.pieces[x].getLocation()) == this.getStrPosition(location)){
                this.pieces.splice(x,1)
            }
        }
    }
    move(from,to){
        let piece = this.getPiece(from)
        if(!piece)return [false,'빈 자리입니다.']
        if(piece.getColor()!=this.turn)return [false,`${this.turn?'흑색':'백색'} 체스말의 차례입니다.`]
        if(!this.pathTest(piece,to))return [false,'진로가 다른 말에 막혀있습니다.']
        let target = this.getPosition(to)
        if(target){
            if(target[1]==piece.getColor())return [false,'목적지에 같은 색 말이 있습니다.']
            this.turn = !this.turn
            this.removePiece(to)
            piece.setPosition(to)
            this.board[to[0]][this.file[to[1]]] = this.board[from[0]][this.file[from[1]]]
            this.board[from[0]][this.file[from[1]]] = 0
            if(piece.getName()=='Pawn'){
                if(piece.upgradeCheck()){
                    this.board[to[0]][this.file[to[1]]] = ['Queen',this.board[to[0]][this.file[to[1]]][1]]
                }
            }
            return [true,true]
        }else{
            this.turn = !this.turn
            piece.setPosition(to)
            this.board[to[0]][this.file[to[1]]] = this.board[from[0]][this.file[from[1]]]
            this.board[from[0]][this.file[from[1]]] = 0
            if(piece.getName()=='Pawn'){
                
                if(piece.upgradeCheck()){
                    this.board[to[0]][this.file[to[1]]] = ['Queen',this.board[to[0]][this.file[to[1]]][1]]
                }
            }
            return [true,false]
        }
    }
}
module.exports = Board;