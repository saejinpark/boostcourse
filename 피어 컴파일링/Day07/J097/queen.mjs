import {pos, Position, isInBoard} from './position.mjs';
import {Team, Piece} from './piece.mjs';

class Queen extends Piece {
  constructor(team, position){
    super(team, position);
    this.init();
  }
  init(){
    this.moves = [{file:  0, rank:  1},
      {file:  0, rank: -1},
      {file:  1, rank:  0},
      {file: -1, rank:  0},
      {file:  1, rank:  1},
      {file:  1, rank: -1},
      {file: -1, rank:  1},
      {file: -1, rank: -1}];
  }
  static index = 4;
  static score = 9;
  static maxnumber = 1;

  static checkSetPosition(team, position){
    return (position.file == pos.FileE)&&
           (team === Team.white &&
            position.rank == pos.Rank8 ||
            team === Team.black &&
            position.rank == pos.Rank1);
  }

  toward(board, checkValid, curFile, curRank, stepFile, stepRank){
    let pathList = [];
    let [nextFile, nextRank] = [curFile+stepFile, curRank+stepRank];
    if (isInBoard(nextFile, nextRank)) {
      if (!checkValid)
        pathList.push(new Position(nextFile, nextRank),
        ...this.toward(board, checkValid, nextFile, nextRank, stepFile, stepRank));
      else {
        if (board[nextRank][nextFile] === null)
          pathList.push(new Position(nextFile, nextRank),
          ...this.toward(board, checkValid, nextFile, nextRank, stepFile, stepRank));
        else if (board[nextRank][nextFile].team !== this.team)
          pathList.push(new Position(nextFile, nextRank));
      }
    }
    return pathList;
  }

  event(){
  }
}

export default Queen;