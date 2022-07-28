import Piece from "./Piece.mjs"
const log = console.log

// 생성 위치 제한
// 대각선으로만 이동 가능

// 북서, 북동, 남동, 남서
let dx = [-1,-1,1,1]
let dy = [-1,1,1,-1]

export default class Bishop extends Piece{ 
    constuctor(type, file, rank, color) {
        super.constuctor(type, file, rank, color)
        // if(color === "White" && rank==="8" && (file==="C" || file==="F")) {
        //     super(file, rank, color)
        // }
        // else if(color === "Black" && rank==="1" && (file==="C" || file==="F") ) {
        //     super(file, rank, color)
        // }
    }
    possiblePositions() {
        super.possiblePositions()
        // 갈 수 있는 경로 출력
        ret_arr = []
        // 원래 file 값 : this.Position.file + 'A'
        // 원래 rank 값 :  this.Position.rank + 1
        let row = this.Position.rank // 행
        let column = this.Position.file // 열
        let max_move_rank = row < 7 - row ? row : 7-row;
        let max_move_file = column < 7 - column ? column : 7 - column;
        let max_move = max_move_rank < max_move_file ? max_move_rank : max_move_file
        for(let i=1;i<=max_move;++i) { // 가는 칸 수
            for(let j=0;j<4;++j) { // 방향
                let nrow = row + dx[j]*i;
                let ncol = column + dy[j]*i;
                if(nrow >= 0 && nrow < 8 && ncol >=0 && ncol < 8) {
                    let nfile = ncol + 'A'
                    let nrank = nrow + 1
                    let ret=""
                    ret+=nfile
                    ret+=nrank
                    ret_arr.push(ret)
                }
            }
        }
        return ret_arr
    }
}
