const { read } = require("./read.js")
const Board = require("./board.js")
const Printer = require("./printer.js")
// const read = require("./read.js")

const board = new Board()
const printer = new Printer()
const black = 0
const white = 1
const ORDER = /\?[A-H][1-8]/
const MOVE = /[A-H][1-9]->[A-H][1-9]/

function initGame(){
    board.initPiece(['Pawn',black],[1,0])
    board.initPiece(['Pawn',black],[1,1])
    board.initPiece(['Pawn',black],[1,2])
    board.initPiece(['Pawn',black],[1,3])
    board.initPiece(['Pawn',black],[1,4])
    board.initPiece(['Pawn',black],[1,5])
    board.initPiece(['Pawn',black],[1,6])
    board.initPiece(['Pawn',black],[1,7])

    board.initPiece(['Rook',black],[0,0])
    board.initPiece(['Knight',black],[0,1])
    board.initPiece(['Bishop',black],[0,2])
    board.initPiece(['Queen',black],[0,4])
    board.initPiece(['Bishop',black],[0,5])
    board.initPiece(['Knight',black],[0,6])    
    board.initPiece(['Rook',black],[0,7])

    board.initPiece(['Pawn',white],[6,0])
    board.initPiece(['Pawn',white],[6,1])
    board.initPiece(['Pawn',white],[6,2])
    board.initPiece(['Pawn',white],[6,3])
    board.initPiece(['Pawn',white],[6,4])
    board.initPiece(['Pawn',white],[6,5])
    board.initPiece(['Pawn',white],[6,6])
    board.initPiece(['Pawn',white],[6,7])

    board.initPiece(['Rook',white],[7,0])
    board.initPiece(['Knight',white],[7,1])
    board.initPiece(['Bishop',white],[7,2])
    board.initPiece(['Queen',white],[7,4])
    board.initPiece(['Bishop',white],[7,5])
    board.initPiece(['Knight',white],[7,6])
    board.initPiece(['Rook',white],[7,7])
}

function str2location(str){
    str = str.match(/[^?]+/)[0]
    dict = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7}
    return [str[1]*1-1,dict[str[0]]]
}

function getFrom(str){
    return str.split('->')[0]
}
function getTo(str){
    return str.split('->')[1]
}

function game(input,rl){
    if(ORDER.test(input)){
        let location = str2location(input)
        let piece = board.getPiece(location)
        if(piece){
            let option = piece.possiblePositions()
            printer.printOptions(option)
        }
        else{
            printer.emptySpace()
        }
    }
    else if(MOVE.test(input)){
        let from = str2location(getFrom(input))
        let to = str2location(getTo(input))
        let result = board.move(from, to)
        if(result[0]){
            if(result[1]){
                let scores = []
                scores.push(board.getScore(0))
                scores.push(board.getScore(1))
                printer.printScore(scores)
            }
            printer.printBoard(board.display())
        }
        else{
            printer.printException(result[1])
        }
    }
    else{
        printer.notOrder();
    }
    // printer.printBoard(board.display())
    rl.resume()
}

initGame()
printer.printBoard(board.display())
read(game)

// console.log(board.move([0,1],[2,0]))
// console.log(board.move([1,1],[2,1]))
// printer.printBoard(board.display())