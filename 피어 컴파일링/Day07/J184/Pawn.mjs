import Piece from "./Piece.mjs"
const log = console.log

// 생성 위치 제한
// 백색은 더 작은 랭크로, 흑색은 더 큰 rank로 (반대로는 못 가는 듯)
// 대각선 이동 없음(처음에도 1칸만 이동 가능)
// Queen으로 변경될 수 있음 - 미구현

export default class Pawn extends Piece{
    constuctor(type, file, rank, color) {
        super.constuctor(type, file,rank,color);
        // if(color === "White" && rank==="7") {
        //     super(file, rank, color)
        // }
        // else if(color === "Black" && rank==="2") {
        //     super(file, rank, color)
        // }
    }
    possiblePositions() {
        // 갈 수 있는 경로 출력 (한 칸만(RANK) 이동 가능함)
        if(this.color===0) { // White
            // Rank 감소
            np = ""
            np += this.Position.file + 'A'
            np += this.Position.rank + 1 - 1
            return np;
        }
        else { // Black
            // Rank 증가
            np = ""
            np += this.Position.file + 'A'
            np += this.Position.rank + 1 + 1
            return np;
        }
    }
}
