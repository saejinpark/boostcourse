const print = console.log
class Printer{
    constructor(){
        this.pieceType = {'Pawn':0, 'Knight':1, 'Bishop':2, 'Rook':3, 'Queen':4}
        this.piecename = [['265F','265E','265D','265C','265B'],['2659','2658','2657','2656','2655']]
        this.file = ['A','B','C','D','E','F','G','H']
    }
    getPieceString(color, type){
        return String.fromCharCode(parseInt(this.piecename[color][type],16))
    }
    getStrPosition(position){
        return this.file[position[1]]+(position[0]+1)
    }
    strFileLine(){
        let text = ' '
        for(let x of this.file){
            text+=x
        }
        return text+'\n'
    }
    printOptions(option){
        for(let x of option){
            print(this.getStrPosition(x)," ")
        }
    }
    printBoard(board){
        let text = ''
        text+=this.strFileLine()
        for(let rank in board){
            text+=(rank*1+1)
            for(let file of board[rank]){
                if(file){
                    text+=this.getPieceString(file[1],this.pieceType[file[0]])
                }
                else{
                    text+='.'
                }
            }
            text+='\n'
        }
        text+=this.strFileLine()
        print(text)
    }
    notOrder(){
        print('유효한 명령이 아닙니다.\n')
    }
    emptySpace(){
        print('빈 자리입니다.\n')
    }
    printException(e){
        print(e)
    }
    printScore(scores){
        print(`흑색 점수 : ${scores[0]}, 백색 점수${scores[1]}`)
    }
}
module.exports = Printer;