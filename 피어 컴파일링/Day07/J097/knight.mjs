import {pos, Position, isInBoard} from './position.mjs';
import {Team, Piece} from './piece.mjs';

class Knight extends Piece {
  constructor(team, position){
    super(team, position);
    this.init();
  }
  init(){
    this.moves = [{file: 0, rank: 1},
      {file: 1, rank: 0},
      {file: 0, rank:-1},
      {file:-1, rank: 0}];
  }
  static index = 1;
  static score = 3;
  static maxnumber = 2;

  static checkSetPosition(team, position){
    return (position.file == pos.FileB ||
            position.file == pos.FileG)&&
           (team === Team.white &&
            position.rank == pos.Rank8 ||
            team === Team.black &&
            position.rank == pos.Rank1);
  }

  toward(board, checkValid, curFile, curRank, stepFile, stepRank){
    let pathList = [];
    let [nextFile, nextRank] = [curFile+stepFile, curRank+stepRank];
    let [next2File, next2Rank] = [[nextFile+stepFile+stepRank, nextFile+stepFile-stepRank],
                                  [nextRank+stepRank+stepFile, nextRank+stepRank-stepFile]];
    if (isInBoard(nextFile, nextRank)) {
      if (!checkValid ||
          board[nextRank][nextFile] === null) {
        for (let i=0; i<2; i++)
            if (isInBoard(next2File[i], next2Rank[i]) &&
               (!checkValid ||
                board[next2Rank[i]][next2File[i]] === null ||
                board[next2Rank[i]][next2File[i]].team !== this.team))
              pathList.push(new Position(next2File[i], next2Rank[i]));
      }
    }
    return pathList;
  }

  event(){
  }
}

export default Knight;