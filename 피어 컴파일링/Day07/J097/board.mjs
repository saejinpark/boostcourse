import {pos, Position, isInBoard} from './position.mjs';
import {Team, Piece} from './piece.mjs';
import Pawn from './pawn.mjs';
import Knight from './knight.mjs';
import Bishop from './bishop.mjs';
import Rook from './rook.mjs';
import Queen from './queen.mjs';

// import {Format, Formatter} from './formatter.mjs';

class Board {
  constructor(){
    this.init();
  }
  init(){
    this.board = []; //8*8, each cell is init with null

    for (let i=0; i<8; i++){
      this.board.push([]);
      for (let j=0; j<8; j++)
        this.board[i].push(null);
    }

    this.initPiece(Team.white, Pawn   , new Position(pos.FileA, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileB, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileC, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileD, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileE, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileF, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileG, pos.Rank7));
    this.initPiece(Team.white, Pawn   , new Position(pos.FileH, pos.Rank7));
    this.initPiece(Team.white, Rook   , new Position(pos.FileA, pos.Rank8));
    this.initPiece(Team.white, Knight , new Position(pos.FileB, pos.Rank8));
    this.initPiece(Team.white, Bishop , new Position(pos.FileC, pos.Rank8));
    this.initPiece(Team.white, Queen  , new Position(pos.FileE, pos.Rank8));
    this.initPiece(Team.white, Bishop , new Position(pos.FileF, pos.Rank8));
    this.initPiece(Team.white, Knight , new Position(pos.FileG, pos.Rank8));
    this.initPiece(Team.white, Rook   , new Position(pos.FileH, pos.Rank8));

    this.initPiece(Team.black, Pawn   , new Position(pos.FileA, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileB, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileC, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileD, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileE, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileF, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileG, pos.Rank2));
    this.initPiece(Team.black, Pawn   , new Position(pos.FileH, pos.Rank2));
    this.initPiece(Team.black, Rook   , new Position(pos.FileA, pos.Rank1));
    this.initPiece(Team.black, Knight , new Position(pos.FileB, pos.Rank1));
    this.initPiece(Team.black, Bishop , new Position(pos.FileC, pos.Rank1));
    this.initPiece(Team.black, Queen  , new Position(pos.FileE, pos.Rank1));
    this.initPiece(Team.black, Bishop , new Position(pos.FileF, pos.Rank1));
    this.initPiece(Team.black, Knight , new Position(pos.FileG, pos.Rank1));
    this.initPiece(Team.black, Rook   , new Position(pos.FileH, pos.Rank1));
  }

  //해당 좌표에 있는 기물 반환
  pieceAt(rank, file){
    if (isInBoard(rank, file))
      return this.board[file][rank];
    else //throw
      throw "pieceAt 지정 범위 바깥";
  }

  //조건 따지지 않고 기물 생성
  setPiece(team, type, pos){
    if (!isInBoard(pos.file, pos.rank))
      throw "포지션이 보드 바깥임";
    if (this.pieceAt(pos.file, pos.rank) !== null)
      return false; //그 자리에 뭐가 있으면 false 반환
    let newPiece = new type(team, pos);
    this.board[pos.rank][pos.file] = newPiece;
    return true; //정상적으로 생성하면 true 반환
  }

  //조건 따지면서 기물 생성
  initPiece(team, type, pos){
    if (!type.checkSetPosition(team, pos))
      throw "기물을 둘 수 있는 초기 위치가 아님";
    if (!type.checkCurrentNumber(this, team))
      throw "기물의 최대 갯수를 초과함";
    if (!this.setPiece(team, type, pos))
      throw "다른 기물이 이미 있음";
  }

  //기물 이동
  move(team, posFrom, posTo){
    //문제 설명에는 이동할 수 없으면 false, 이동할 수 있으면 true지만
    //인터페이스에서 실행 중에 문제 생기면 try catch 로 다 잡는 디자인 생각하면
    //이동할 수 없을 때 false를 보내는 것보다는 throw 던지는게 훨씬 디자인이 깔끔하다고 생각
    //기물을 잡았을 때 true, 안 잡고 이동했을 때 false를 반환함.
    if (this.pieceAt(posFrom.file, posFrom.rank) === null)
      throw "지정 위치에 이동할 수 있는 기물 없음";
    if (this.pieceAt(posFrom.file, posFrom.rank).team !== team)
      throw "지정 기물이 상대편의 기물이라 움직일 수 없음";
    let movable = false; //목적지 좌표가 실제로 이동 가능한 후보군 중 하나인지?
    this.pieceAt(posFrom.file, posFrom.rank).move(this.board, true).forEach((pos)=>{
      if (pos.file === posTo.file && pos.rank === posTo.rank)
        movable = true;
    });
    if (movable) {
        let killed = this.pieceAt(posTo.file, posTo.rank) !== null;
        
        if (killed && this.pieceAt(posTo.file, posTo.rank).team === team)
          throw "발생할 수 없는 오류: 자신의 기물을 잡고 이동함";

        this.board[posFrom.rank][posFrom.file].position = new Position(posTo.file, posTo.rank);
        this.board[posTo.rank][posTo.file] = this.pieceAt(posFrom.file, posFrom.rank);
        this.board[posFrom.rank][posFrom.file] = null;
        this.board[posTo.rank][posTo.file].event(); //각 기물별 이동 시 이벤트 호출, 현재는 Pawn 의 퀸 승급밖에 없음
        return killed;
      }
    else
      throw "지정 기물을 배치할 수 없는 위치임";
  }

  //점수 반환
  countScore(){
    let score = [0, 0];
    for (let y=pos.Rank1; y<=pos.Rank8; y++)
      for (let x=pos.FileA; x<=pos.FileH; x++)
        if (this.pieceAt(x, y) !== null)
          score[this.pieceAt(x, y).team]+=this.pieceAt(x, y).constructor.score;
    return score;
  }

  //기물 갯수 반환
  countPiece(){
    let pieceNumber = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    for (let y=pos.Rank1; y<=pos.Rank8; y++)
      for (let x=pos.FileA; x<=pos.FileH; x++)
        if (this.pieceAt(x, y) !== null)
          pieceNumber[this.pieceAt(x, y).team][this.pieceAt(x, y).constructor.index]++;
    return pieceNumber;
  }

  //보드에 대한 8*8 정보 반환, 각 요소는 [팀, 기물 종류]
  display(){
    return this.board.map((line)=>
      line.map((piece) => {
        if (piece === null)
          return piece = [0, -1];
        else 
          return piece = [piece.team, piece.constructor.index];
      })
    )
  }

  //pos에 있는 기물의 실제로 이동 가능한 경로 출력
  showAvailablePath(pos){
    if (this.pieceAt(pos.file, pos.rank) === null)
      throw "해당 위치에 기물 없음"
    //아군, 적군 기물 상관없이 표시함. 이래도 되는진 모르겠지만
    return this.pieceAt(pos.file, pos.rank).move(this.board, true);
  }
}

export default Board;




//---------------------

// let board = new Board();
// for (let i=0; i<8; i++){
//   let str="";
//   for (let j=0; j<8; j++){
//     str += Knight.checkSetPosition(Team.black, new Position(j, i))?"1":"0";
//   }
//   console.log(str);
// }
// board.initPiece(Team.white, Pawn, new Position(pos.FileA, pos.Rank1));
// board.setPiece(Team.white, Pawn, new Position(pos.FileB, pos.Rank1));
// board.setPiece(Team.white, Pawn, new Position(pos.FileC, pos.Rank1));
// board.setPiece(Team.white, Pawn, new Position(pos.FileD, pos.Rank1));
// board.setPiece(team.black, Pawn, new Position(pos.FileE, pos.Rank1));
// board.setPiece(team.black, Pawn, new Position(pos.FileF, pos.Rank1));
// console.log(JSON.stringify(board.board, null, 4));
// console.log(board.move(team.black, new Position(pos.FileD, pos.Rank1), new Position(pos.FileD, pos.Rank2)));
// console.log(board.move(team.black, new Position(pos.FileE, pos.Rank1), new Position(pos.FileD, pos.Rank2)));
// console.log(board.move(team.black, new Position(pos.FileE, pos.Rank1), new Position(pos.FileE, pos.Rank2)));

// console.log(board.countPiece(), board.countScore());
// console.log(board.display());
// console.log(JSON.stringify(board.board, null, 4));

// board.setPiece(Team.white, Pawn, new Position(pos.FileD, pos.Rank4));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));

// board.setPiece(Team.white, Knight, new Position(pos.FileD, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileE, pos.Rank4));
// board.setPiece(Team.white, Pawn, new Position(pos.FileC, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileC, pos.Rank2));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));
// console.log(board.display());
// console.log(board.board[3][3].move(board.board, true).map(v=>v.toString()));

// board.setPiece(Team.white, Bishop, new Position(pos.FileD, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileE, pos.Rank3));
// board.setPiece(Team.white, Pawn, new Position(pos.FileC, pos.Rank3));
// board.setPiece(Team.black, Pawn, new Position(pos.FileF, pos.Rank6));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));
// console.log(board.display());
// console.log(board.board[3][3].move(board.board, true).map(v=>v.toString()));

// board.setPiece(Team.white, Rook, new Position(pos.FileD, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileE, pos.Rank4));
// board.setPiece(Team.white, Pawn, new Position(pos.FileC, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileC, pos.Rank2));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));
// console.log(board.display());
// console.log(board.countScore());
// console.log(board.board[3][3].move(board.board, true).map(v=>v.toString()));

// board.setPiece(Team.white, Queen, new Position(pos.FileD, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileE, pos.Rank4));
// board.setPiece(Team.white, Pawn, new Position(pos.FileC, pos.Rank4));
// board.setPiece(Team.black, Pawn, new Position(pos.FileC, pos.Rank2));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));
// console.log(board.display());
// console.log(board.countScore());
// console.log(board.board[3][3].move(board.board, true).map(v=>v.toString()));

// board.setPiece(Team.white, Queen, new Position(pos.FileD, pos.Rank4));
// console.log(board.board[3][3].possiblePositions().map(v=>v.toString()));
// console.log(board.display());
// board.board[3][3].team = Team.black;
// console.log(board.display());

// ---- promotion test

// board.setPiece(Team.white, Pawn, new Position(pos.FileD, pos.Rank2));
// console.log(board.display());
// console.log(board.move(Team.white, new Position(pos.FileD, pos.Rank2), new Position(pos.FileD, pos.Rank1), board.display));
// console.log(board.display());
// console.log(board.showAvailablePath({file: pos.FileD, rank: pos.Rank1}));
// console.log(board.board[0][3].move(board.board, true).map(v=>v.toString()));


// ----- formatter test
// console.log(Formatter.output(Format.ChessBoard, board.display()));
// console.log(Formatter.output(Format.AvailablePath, board.showAvailablePath(new Position(pos.FileD, pos.Rank1))));
// console.log(Formatter.output(Format.ScoreBoard, board.countScore()));