const ChessPiece = require("./Piece");
const { fileArray, posFileToIdxObj } = require("./util");

function Rook(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.icon = this.teamColor === "black" ? "\u265C" : "\u2656";
  this.direction = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  // possiblePositions
  this.possiblePositions = function () {
    const sameNumber = fileArray.map((el) => el + posRank);
    const sameLetter = fileArray.map((_, idx) => posFile + (idx + 1));

    const returnArr = [...sameLetter, ...sameNumber].filter(
      (el) => el !== posFile + posRank
    );

    return returnArr;
  };

  this.filterUnavailablePos = function (arr, board) {
    const result = [];

    const fileteredArr = arr.filter((el) => {
      const currentPos = [Number(el[1]), posFileToIdxObj[el[0]]];
      return board.boardMap[currentPos[0]][currentPos[1]] === ".";
    });

    // 1. 같은 알파벳, 연속된 숫자
    const currentPos = [this.posFile, this.posRank];
    // const filterByAlphabet = fileteredArr.filter(
    //   (el) => el[0] === this.posFile
    // );
    let diff = 1;

    while (currentPos[1] + diff <= 8) {
      const num = currentPos[1] + diff;
      const pos = currentPos[0] + num;
      if (fileteredArr.includes(pos)) {
        result.push(pos);
        diff++;
      } else break;
    }

    diff = 1;

    while (currentPos[1] - diff >= 0) {
      const num = currentPos[1] - diff;
      const pos = currentPos[0] + num;
      if (fileteredArr.includes(pos)) {
        result.push(pos);
        diff++;
      } else break;
    }

    diff = 1;

    // 2. 같은 숫자, 연속된 알파벳
    const alphabetIdx = posFileToIdxObj[this.posFile];

    while (alphabetIdx + diff <= 8) {
      const alphabet = posFileToIdxObj[alphabetIdx + diff];
      const pos = alphabet + currentPos[1];
      if (fileteredArr.includes(pos)) {
        result.push(pos);
        diff++;
      } else break;
    }

    diff = 1;

    while (alphabetIdx - diff >= 0) {
      const alphabet = posFileToIdxObj[alphabetIdx - diff];
      const pos = alphabet + currentPos[1];
      if (fileteredArr.includes(pos)) {
        result.push(pos);
        diff++;
      } else break;
    }

    console.log(result);
    return result;
  };
}

Rook.prototype = new ChessPiece();
module.exports = Rook;
