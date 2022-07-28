import {pos, Position, isInBoard} from './position.mjs';

const Team = {white: 0, black: 1};
Object.freeze(Team);

class Piece {
  constructor(team, position){
    this.team = team;
    Object.defineProperty(this, 'team', {writable: false}); //team 변경 불가
    this.position = position;
    this.moves = []; // 기물의 이동 방법에 대한 프로퍼티
  }
  static index = -1; //배열에서 사용될 기물의 index, Piece는 사용되어선 안됨
  static score = undefined; //기물의 점수
  static maxnumber = 0; //배치될 수 있는 최대 수

  static checkCurrentNumber(Board, team){
    //use board's piece counter and return counter < maxnumber;
    return Board.countPiece()[team][this.index] < this.maxnumber;
  }

  static checkSetPosition(team, position){ //초기 위치 확인
    return pos.FileA <= position.file &&
           pos.Rank1 <= position.rank &&
           pos.FileH >= position.file &&
           pos.Rank8 >= position.rank;
  }

  possiblePositions(){ //보드에 깔린 기물 상관 없이 무지성 경로 반환
    return this.move(null, false);
  }

  move(board, checkValid){ //경로 반환, checkValid가 true면 실제로 이동 가능한지 확인
    let pathList = [];
    this.moves.forEach(({file, rank}) => {
      pathList.push(...this.toward(board, checkValid, this.position.file, this.position.rank, file, rank));
    });
    return pathList;
  }

  //기물의 이동 방법 구현
  toward(board, checkValid, curFile, curRank, stepFile, stepRank){
    console.log("Error");
  }

  //이동할 때마다 실행되는 이벤트, pawn의 queen promotion 용임
  event(){
    console.log("Error");
  }
}

export { Team, Piece };