import Piece from "./Piece.mjs"
const log = console.log

// 생성 위치 제한
// 움직임 제약 없음

export default class Queen extends Piece{
    constuctor(type, file, rank, color) {
        super.constuctor(type, file, rank, color)
        // if(color === "White" && rank==="8" && file==="E") {
        //     super(file, rank, color)
        // }
        // else if(color === "Black" && rank==="1" && file==="E") {
        //     super(file, rank, color)
        // }
    }
    possiblePositions() {
        // 갈 수 있는 경로 출력
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
            for(let j=-1;j<=1;++j) {
                for(let k=-1;k<=1;++k) {
                    if(j|k) { // 0, 0만 제외
                        let nrow = row + j*i;
                        let ncol = column + k*i;
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
            }
        }
        return ret_arr
    }
}
