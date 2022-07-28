import {pos, Position, isInBoard} from './position.mjs';
import {Team, Piece} from './piece.mjs';
import Queen from './queen.mjs';

class Pawn extends Piece {
  constructor(team, position){
    super(team, position);
    this.init();
  }

  init() {
    this.moves = [{file: 0, rank:-1+this.team*2}];
  }

  static index = 0;
  static score = 1;
  static maxnumber = 8;

  static checkSetPosition(team, position){
    return  position.file >= pos.FileA &&
            position.file <= pos.FileH &&
           (team === Team.white &&
            position.rank === pos.Rank7 ||
            team === Team.black &&
            position.rank === pos.Rank2);
  }

  toward(board, checkValid, curFile, curRank, stepFile, stepRank){
    let pathList = [];
    let [nextFile, nextRank] = [curFile+stepFile, curRank+stepRank];
    if (isInBoard(nextFile, nextRank)) {
      if (!checkValid ||
          board[nextRank][nextFile] === null ||
          board[nextRank][nextFile].team !== this.team) {
        pathList.push(new Position(nextFile, nextRank));
      }
    }
    return pathList;
  }

  event(){
    if (this.team === Team.white && this.position.rank === pos.Rank1 ||
        this.team === Team.black && this.position.rank === pos.Rank8) {
      this.__proto__ = Queen.prototype;
      this.init(); //퀸으로 승급, 프로토타입 자체를 교체하고 메서드 초기화
    }
  }
}

export default Pawn;