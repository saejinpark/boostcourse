import Pawn from "./Pawn.mjs"
import Bishop from "./Bishop.mjs"
import Rook from "./Rook.mjs"
import Queen from "./Queen.mjs"
import Knight from "./Knight.mjs"
const log = console.log;
// King은 없음

// 8 x 8 크기 체스판에 체스말 존재 여부 관리
// 프로그램 시작 시 King을 제외한 모든 말 초기화

// Score - Pawn : 1, Bishop & Knight : 3, Queen : 9

// prototype으로 만드는 경우 export를 어떻게 하는 것인가..

const File_Enum = {
    A : 0, B : 1, C : 2, D : 3, E : 4, F : 5, G : 6, H : 7 
}
const Rank_Enum = {
    1 : 0, 2 : 1, 3 : 2, 4 : 3, 5 : 4, 6 : 5, 7 : 6, 8 : 7
}

export default class Board {
    constructor() {
        this.arr = Array.from(Array(8), () => new Array(8).fill(0)) // 8 x 8
        this.White = {}
        this.White.Pawn_cnt = 0
        this.White.Bishop_cnt = 0
        this.White.Rook_cnt = 0
        this.White.Queen_cnt = 0
        this.White.Knight_cnt = 0
        this.Black = {}
        this.Black.Pawn_cnt = 0
        this.Black.Bishop_cnt = 0
        this.Black.Rook_cnt = 0
        this.Black.Queen_cnt = 0
        this.Black.Knight_cnt = 0
        this.Max = {}
        this.Max.Pawn_cnt = 8
        this.Max.Bishop_cnt = 2
        this.Max.Rook_cnt = 2
        this.Max.Queen_cnt = 1
        this.Max.Knight_cnt = 2
    }
    display() { // rank 전체 리턴
        let ret_arr = Array.from(Array(8), () => new Array(8).fill(0)) // 8 x 8
        for(let i=0;i<8;++i) {
            for(let j=0;j<8;++j) {
                if(this.arr[i][j]===0) ret_arr[i][j] = 0;
                else {
                    //log(this.arr[i][j])
                    let val = {}
                    val.type = this.arr[i][j].type;
                    val.color = this.arr[i][j].color;
                    ret_arr[i][j] = val;
                    //log("ret_arr[i][j]", ret_arr[i][j])
                }
            }
        }
        return ret_arr;
    }

    // position : A2(예시)
    initPiece(type, position) {
         /*
        특정 위치에 특정 말 생성
        초기 위치가 아니면 생성하지 않음
        체스말 최대 개수 지켜야 함
        이미 해당 위치에 다른 말이 있는 경우 생성하지 않음
        생성하지 않는 경우 -> 예외처리 필요! - 미구현
    */
    // position : A2(예시)
    let file = position[0];
    let rank = position[1];
    if(this.arr[Rank_Enum[rank]][File_Enum[file]]!==0) return null; // 
    let piece;
    if(type === "Pawn") {
        if(rank==="7") {
            if(this.White.Pawn_cnt < this.Max.Pawn_cnt) {
                this.White.Pawn_cnt++;
                piece = new Pawn(type, file, rank, "White");
            }
        }
        else if(rank==="2") {
            if(this.Black.Pawn_cnt < this.Max.Pawn_cnt) {
                this.Black.Pawn_cnt++;
                piece = new Pawn(type, file, rank, "Black");
            }
        }
    }
    else if(type === "Bishop") {
        if(rank==="8" && (file==="C" || file==="F")) {
            if(this.White.Bishop_cnt < this.Max.Bishop_cnt) {
                this.White.Bishop_cnt++;
                piece = new Bishop(type, file, rank, "White")
            }
        }
        else if(rank==="1" && (file==="C" || file==="F") ) {
            if(this.Black.Bishop_cnt < this.Max.Bishop_cnt) {
                this.Black.Bishop_cnt++;
                piece = new Bishop(type, file, rank, "Black")
            }
        }
    }
    else if(type === "Rook") {
        if(rank==="8" && (file==="A" || file==="H")) {
            if(this.White.Rook_cnt < this.Max.Rook_cnt) {
                this.White.Rook_cnt++;
                piece = new Rook(type, file, rank, "White")
            }
        }
        else if(rank==="1" && (file==="A" || file==="H")) {
            if(this.Black.Rook_cnt < this.Max.Rook_cnt) {
                this.Black.Rook_cnt++;
                piece = new Rook(type, file, rank, "Black")
            }
        }
    }
    else if(type === "Queen") {
        if(rank==="8" && file==="E") {
            if(this.White.Queen_cnt < this.Max.Queen_cnt) {
                this.White.Queen_cnt++;
                piece = new Queen(type, file, rank, "White")
            }
        }
        else if(rank==="1" && file==="E") {
            if(this.Black.Queen_cnt < this.Max.Queen_cnt) {
                this.Black.Queen_cnt++;
                piece = new Queen(type, file, rank, "Black")
            }
        }
    }
    else if(type === "Knight") {
        if(rank==="8" && (file==="B" || file==="G")) {
            if(this.White.Knight_cnt < this.Max.Knight_cnt) {
                this.White.Knight_cnt++;
                piece = new Knight(type, file, rank, "White")
            }
        }
        else if(rank==="1" && (file==="B" || file==="G") ) {
            if(this.Black.Knight_cnt < this.Max.Knight_cnt) {
                this.Black.Knight_cnt++;
                piece = new Knight(type, file, rank, "Black")
            }
        }
    }
    // piece.type
    this.arr[Rank_Enum[rank]][File_Enum[file]] = piece;
    // log(this.arr[Rank_Enum[rank]][File_Enum[file]].type)
    }

    setPiece(type, position, color) { // 편의를 위해 color 추가
        /*
            특정 위치에 특정 말 생성
            위치 상관 없음
            체스말 최대 개수 상관 없음
            단, 기존에 다른 말이 있는 경우에는 생성하지 않음
        */
        if(this.arr[Rank_Enum[rank]][File_Enum[file]]==0) return null; // 
        let file = position[0];
        let rank = poistion[1];
        let piece;
        if(type === "Pawn") {
            piece = new Pawn(type, file, rank, color)
            if(color==="White") this.White.Pawn_cnt++;
            else this.Black.Pawn_cnt++;
        }
        else if(type === "Bishop") {
            piece = new Bishop(type, file, rank, color)
            if(color==="White") this.White.Bishop_cnt++;
            else this.Black.Bishop_cnt++;
        }
        else if(type === "Rook") {
            piece = new Rook(type, file, rank, color)
            if(color==="White") this.White.Rook_cnt++;
            else this.Black.Rook_cnt++;
        }
        else if(type === "Queen") {
            piece = new Queen(type, file, rank, color)
            if(color==="White") this.White.Queen_cnt++;
            else this.Black.Queen_cnt++;
        }
        else if(type === "Knight") {
            piece = new Knight(type, file, rank, color)
            if(color==="White") this.White.Knight_cnt++;
            else this.Black.Knight_cnt++;
        }
        this.arr[Rank_Enum[rank]][File_Enum[file]] = piece;
    }

    move(From, to) {
        /*
            From : Ex(A2)
            to : Ex(B3)
            같은 색상의 말이 to 위치에 있는 경우 옮길 수 없음
            다른 색상의 말이 to 위치에 있는 경우 -> 기존 말 제거 가능 => + 점수 출력
            return : true(말을 옮길 수 있다), false(말을 옮길 수 없다)
        */  
        let file = From[0];
        let rank = From[1];
        let row = Rank_Enum[From[1]];
        let col = File_Enum[From[0]];
        if(this.arr[row][col]===0) { // from의 보드가 empty
            return false;
        }
        else {
            let color = this.arr[row][col].color
            if(color===this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].color) { // 같은 색 여부 확인
                return false;
            }
            // this.arr[Rank_Enum[rank]][File_Enum[file]] -> Position, type, color
            let possiblepos = this.arr[row][col].possiblePositions()
            if(possiblepos.indexOf(to)===-1) { // 도착가능한 칸이 아닌 경우
                return false;
            }
            else {
                // 진짜 갈 수 있는지 판단(가기 전에 가리는 체스 말이 없는지 확인)
                if(this.arr[row][col]==="Pawn") { // Pawn
                    if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].color === color) {
                        // 색 다른 경우에는 밑에서 처리함
                        return false;
                    }
                }
                else if(this.arr[row][col].type === "Queen" 
                || this.arr[row][col].type === "Rook"
                || this.arr[row][col].type === "Bishop") { // Queen, Rook, Bishop
                    let max_move = Rank_Enum[to[0]] - row
                    let dx = Rank_Enum[to[1]] - row
                    let dy = File_Enum[to[0]] - column
                    if(dx<0) dx = -1;
                    else if(dx>0) dx = 1;
                    else dx = 0;
                    if(dy<0) dy = -1;
                    else if(dy>0) dy = 1;
                    else dy = 0;
                    for(let i=1;i<=max_move;++i) {
                        if(this.arr[row+dx*i][col+dy*i] !==0) { // 장애물 존재
                            return false;
                        }
                    }
                }
                else if(this.arr[row][col].type === "Knight") {
                    // 전진 - Rank의 이동으로 간주
                    let dx = Rank_Enum[to[1]] - row
                    if(dx<0) dx = -1;
                    else if(dx>0) dx = 1;
                    if(this.arr[row+dx][col] !==0) { // 장애물 존재
                        return false;
                    }
                }

                if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]] !== 0) { // to에 다른 체스말이 있다.
                    if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].type === "Pawn") {
                        if(color === "White") this.Black.Pawn_cnt--;
                        else this.White.Pawn_cnt--;
                    }
                    else if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].type === "Bishop") {
                        if(color === "White") this.Black.Bishop_cnt--;
                        else this.White.Bishop_cnt--;
                    }
                    else if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].type === "Knight") {
                        if(color === "White") this.Black.Knight_cnt--;
                        else this.White.Knight_cnt--;
                    }
                    else if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].type === "Queen") {
                        if(color === "White") this.Black.Queen_cnt--;
                        else this.White.Queen_cnt--;
                    }
                    else if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].type === "Rook") {
                        if(color === "White") this.Black.Rook_cnt--;
                        else this.White.Rook_cnt--;
                    }
                    score = this.score() // 개수 바뀐 경우 점수 출력
                    log("White Score : ", score.wscore)
                    log("Black Score : ", score.bscore)
                }
                this.arr[Rank_Enum[to[0]]][File_Enum[to[1]]] = this.arr[row][col];
                this.arr[row][col] = 0;
                return true;
            }
        }
    }

    find_possible_pos(From) {
        /*
            From : Ex(A2)
            From칸에 있는 말에 대해 옮길 수 있는 곳 나열.
            막힌 곳은 막힌 곳까지..
        */  
        let rank = From[1];
        let file = From[0];
        let row = Rank_Enum[From[1]]; // Rank_Enum[rank]
        let col = File_Enum[From[0]]; // File_Enum[file]
        if(this.arr[row][col] === 0) { // empty
            log("빈 곳입니다.")
            return false;
        }
        let possiblepos = this.arr[row][col].possiblePositions()
        let color = this.arr[row][col].color
        if(this.arr[row][col].type === "Pawn") {
            let to = possiblepos[0];
            if(this.arr[Rank_Enum[to[1]]][File_Enum[to[0]]].color === color) {
                return null;
            }
        }
        // this.arr[Rank_Enum[rank]][File_Enum[file]] -> Position, type, color
        for(let i=0;i<possiblepos.length;++i) {
            // block별 처리 필요(막는 애 없는지.)
        }    
        
    }

    score() {
        let ret = {}
        ret.wscore = this.White.Pawn_cnt + 3*(this.White.Bishop_cnt + this.White.Knight_cnt) + 5*this.White.Rook_cnt + 9*this.White.Queen_cnt;
        ret.bscore = this.Black.Pawn_cnt + 3*(this.Black.Bishop_cnt + this.Black.Knight_cnt) + 5*this.Black.Rook_cnt + 9*this.Black.Queen_cnt;
        return ret;
    }
}