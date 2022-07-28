const log = console.log
// 체스말 공통
// Position : file(A~H), rank(1~8) -> enum
// Black or White

const File_Enum = {
    A : 0,
    B : 1,
    C : 2,
    D : 3,
    E : 4,
    F : 5,
    G : 6,
    H : 7
}
const Rank_Enum = {
    1 : 0,
    2 : 1,
    3 : 2,
    4 : 3,
    5 : 4,
    6 : 5,
    7 : 6,
    8 : 7
}

Object.freeze(File_Enum);
Object.freeze(Rank_Enum);

export default class Piece {
    constructor(type, file, rank, color) {
        this.Position = {}
        this.Position.file = File_Enum[file];
        this.Position.rank = Rank_Enum[rank];
        this.type = type;
        this.color = color
    }
    possiblePositions() {
        console.log("갈 수 있는 모든 위치를 리턴")
        // 상속된 개별 체스말에서 상세 구현
    }
}