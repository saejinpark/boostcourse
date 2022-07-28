const ChessPiece = require("./Piece");
const { posFileToIdxObj, posIdxToFileObj } = require("./util");
const { fileArray } = require("./util");
const Rook = require("./Rook");
const Bishop = require("./Bishop");

function Queen(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.icon = this.teamColor === "black" ? "\u265B" : "\u2655";
  this.rookUtil = new Rook(this.posFile, this.posRank, this.teamColor);
  this.bishopUtil = new Bishop(this.posFile, this.posRank, this.teamColor);

  // possiblePositions
  this.possiblePositions = function () {
    const possiblePosArr = [];
    const direction = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ];

    direction.forEach((el) => {
      const currentPos = [posFileToIdxObj[posFile], posRank];
      while (
        currentPos[0] >= 1 &&
        currentPos[0] <= 8 &&
        currentPos[1] >= 1 &&
        currentPos[1] <= 8
      ) {
        currentPos[0] = currentPos[0] + el[0];
        currentPos[1] = currentPos[1] + el[1];
        possiblePosArr.push([currentPos[0], currentPos[1]]);
      }
    });

    const sameNumber = fileArray.map((el) => el + posRank);
    const sameLetter = fileArray.map((_, idx) => posFile + (idx + 1));

    const returnArr1 = [...sameLetter, ...sameNumber].filter(
      (el) => el !== posFile + posRank
    );

    const returnArr2 = possiblePosArr
      .filter((el) => el[0] <= 8 && el[0] >= 1 && el[1] <= 8 && el[1] >= 1)
      .map((el) => posIdxToFileObj[el[0]] + el[1]);

    this.filterUnavailablePos = function (arr, board) {
      const arr1 = this.rookUtil.filterUnavailablePos(arr, board);
      const arr2 = this.bishopUtil.filterUnavailablePos(arr1, board);

      return arr2;
    };

    return [...returnArr1, ...returnArr2];
  };
}

Queen.prototype = new ChessPiece();
module.exports = Queen;
