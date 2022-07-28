import Piece from "./Piece.mjs"
const log = console.log

// 생성 위치 제한
// 이동 가능 -> 색상 기준 전진 1칸 + 대각선 1 칸
// 앞이 막혀있으면 움직일 수 없음

let dx = [-1,-2,-2,-1,1,2,2,1]
let dy = [-2,-1,1,2,2,1,-1,-2]

export default class Knight extends Piece{ 
    constuctor(type, file, rank, color) {
        super.constuctor(type, file,rank,color);
        // if(color === "White" && rank==="8" && (file==="B" || file==="G")) {
        //     super(file, rank, color)
        // }
        // else if(color === "Black" && rank==="1" && (file==="B" || file==="G") ) {
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
        for(let j=0;j<8;++j) { // 방향
            let nrow = row + dx[j];
            let ncol = column + dy[j];
            if(nrow >= 0 && nrow < 8 && ncol >=0 && ncol < 8) {
                let nfile = ncol + 'A'
                let nrank = nrow + 1
                let ret=""
                ret+=nfile
                ret+=nrank
                ret_arr.push(ret)
            }
        }
        return ret_arr
    }
}
