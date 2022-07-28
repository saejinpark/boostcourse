const { BOARD_PIECE_BLACK, BOARD_PIECE_WHITE } = require("./board-piece");
const { posFileToIdxObj, posIdxToFileObj } = require("./util");
const ChessBoard = require("./Board");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity,
});

const myChessBoard = new ChessBoard();

// false: 백색, true: 흑색
function main(counter = 0, turn = false) {
  console.log(counter, turn);
  const color = turn ? "black" : "white";
  const inputFirstLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // 초기화하는 함수 생성하기
  if (!counter) {
    console.log("(프로그램 실행)");
    console.log("체스 보드를 초기화했습니다.\n");
    myChessBoard.initPosition();
    main(counter + 1, turn);
  }

  if (counter) {
    console.log("");

    rl.question("명령을 입력하세요> ", function (line) {
      if (
        line[0] === "$" &&
        inputFirstLetter.includes(line[1]) &&
        Number(line[2]) >= 1 &&
        Number(line[2]) <= 8
      ) {
        printAvailablePosition(line[1], line[2], color);
        main(counter, turn);
      }

      if (line.includes("->")) {
        const splitLine = line.split("->");
        const isOkay = myChessBoard.move(splitLine[0], splitLine[1]);
        if (isOkay) main(counter + 1, !turn);
      }
    });
  }

  function printAvailablePosition(file, rank, color) {
    const BOARD_PIECE =
      color === "black" ? BOARD_PIECE_BLACK : BOARD_PIECE_WHITE;
    const COUNTER_PIECE =
      color === "black" ? BOARD_PIECE_WHITE : BOARD_PIECE_BLACK;
    let result;

    for (const el of [...BOARD_PIECE.values()]) {
      if (el.posFile === file && el.posRank === Number(rank)) {
        result = el.possiblePositions();
        const availableArr = el.filterUnavailablePos(result, myChessBoard);
        if (availableArr?.length === 0 || !availableArr) {
          console.log("없음");
          return;
        } else {
          console.log(availableArr.join(","));
          return;
        }
      }
    }
    if (!result) {
      const targetPos = [Number(rank), posFileToIdxObj[file]];
      for (const el of [...COUNTER_PIECE.values()]) {
        if (
          el.posFile == posIdxToFileObj[targetPos[1]] &&
          el.posRank == targetPos[0]
        ) {
          console.log(
            `${color === "white" ? "백색" : "흑색"} 체스말의 차례입니다.`
          );
          return;
        }
      }
    }
  }
}

main();
