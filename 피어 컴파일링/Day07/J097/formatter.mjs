import { Team } from "./piece.mjs";

const Format = {
  YourTurn: 0,
  ChessBoard: 1,
  AvailablePath: 2,
  ScoreBoard: 3
};
Object.freeze(Format);

const Icon = [[".", "♙", "♘", "♗", "♖", "♕"], [".", "♟", "♞", "♝", "♜", "♛"]];

const Formatter = {
  output(format, line){

    if (format === Format.YourTurn){
      if (line === Team.white)
        return "백색 체스말의 차례입니다.";
      if (line === Team.black)
        return "흑색 체스말의 차례입니다.";
    }

    if (format === Format.ChessBoard){
      let str = "  A B C D E F G H\n";
      for (let i=0; i<8; i++){
        str +=  (i+1).toString() + " ";
        for (let piece of line[i])
          str += (Icon[piece[0]][piece[1]+1]) + " ";
        str += ("\n");
      }
      str += ("  A B C D E F G H\n");
      return str;
    }

    if (format === Format.AvailablePath){
      let str="";
      for (let pos of line){
        str += pos.toString() + ", ";
      }
      return str.slice(0, -2);
    }

    if (format === Format.ScoreBoard){
      return `백색 체스말의 점수: ${line[0]}\n흑색 체스말의 점수: ${line[1]}\n`;
    }
  }
}

export {Format, Formatter};