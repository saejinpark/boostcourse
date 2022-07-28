const { Pawn, Bishop, Knight, Rook, Queen } = require("./piece");
const { rank, file } = require("./type");

const readline = require("readline");

const bot = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Chess {
  board = `
  ABCDEFGH
  1........
  2........
  3........
  4........
  5........
  6........
  7........
  8........
   ABCDEFGH
  `;

  start() {
    console.log("(프로그램 실행)");
    this.initBoard();
    console.log("체스 보드를 초기화했습니다.");
    this.printBoard();
    this.chat();
  }

  chat() {
    bot.setPrompt("키워드를 입력하세요> ");
    bot.prompt();

    bot
      .on("line", (line) => {
        console.log(line);
        if (line.trim() === "end") bot.close();
        bot.prompt();
      })
      .on("close", () => process.exit(0));
  }

  initBoard() {
    this.initPiece("pawn", [2, "A"]);
  }
  initPiece(type, position) {
    let color;

    switch (type) {
      case "pawn":
        if (position[0] in [rank[1], rank[2], rank[3], rank[4]]) {
          color = "black";
        } else {
          color = "white";
        }
        const pawn = new Pawn(color, position);
        break;
      case "bishop":
        break;
      case "knight":
        break;
      case "rook":
        break;
      case "queen":
        break;
      default:
    }
  }

  setPiece() {}

  move(from, to) {}

  possiblePositions() {}

  printBoard() {
    console.log(this.board);
  }
}

module.exports = Chess;
