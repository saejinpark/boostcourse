import Board from './board.mjs';
import { Formatter, Format } from './formatter.mjs';
import {Team} from './piece.mjs';
import {Validator, Valid} from './validator.mjs';

class Interface{
  constructor(){
    this.board = new Board();
    this.turn = Team.white;
    this.message = null;
  }
  
  //명령어 실행함
  command(line){
    //추가로 표시할 메세지 있으면 true 리턴, 아니면 false
    const result = Validator.input(line); //입력받은 줄을 유효성 검사
    if (result.status === Valid.MOVE){ //기물 이동 명령어?
      this.message = null;
      if (this.board.move(this.turn, //기물 이동의 결과로 무언가를 잡아먹은 경우
                      result.groups.posFrom,
                      result.groups.posTo)) {
        this.turn = 1 - this.turn;
        this.message = Formatter.output(Format.ScoreBoard, this.board.countScore()); //점수판 알림 등록함
        return true;
      }
      this.turn = 1 - this.turn;
      return false;
    }

    if (result.status === Valid.SHOW){ //경로 표시 명령어?
      this.message = Formatter.output(Format.AvailablePath, this.board.showAvailablePath(result.groups.pos));
      return true;
    }
  }
  
  //command의 결과로 추가로 표시할 알림을 문자열로 반환함
  notification(){
    if (this.message !== null)
      return this.message;
    else
      return "Something wrong";
  }
  
  //체스판과 차례 문자열로 반환함
  display(){
    return Formatter.output(Format.ChessBoard, this.board.display()) +
           Formatter.output(Format.YourTurn, this.turn);
  }
}

// let a = new Interface();
// console.log(a.display());
// console.log(a.command("?A7"))
// console.log(a.notification())

export default Interface;