const ChessPiece = require("./Piece");
const { posIdxToFileObj, posFileToIdxObj } = require("./util");

function Bishop(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.icon = this.teamColor === "black" ? "\u265D" : "\u2657";

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

    const returnArr = possiblePosArr
      .filter((el) => el[0] <= 8 && el[0] >= 1 && el[1] <= 8 && el[1] >= 1)
      .map((el) => posIdxToFileObj[el[0]] + el[1]);

    return returnArr;
  };

  this.filterUnavailablePos = function (arr, board) {
    const answer = [];
    const currentPos = [this.posRank, posFileToIdxObj[this.posFile]];
    const dir = [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ];

    for (d of dir) {
      let diff = 1;
      while (
        currentPos[0] + d[0] * diff <= 8 &&
        currentPos[0] + d[0] * diff >= 0 &&
        currentPos[1] + d[1] * diff <= 8 &&
        currentPos[1] + d[1] * diff >= 0
      ) {
        const forwardPos = [
          currentPos[0] + d[0] * diff,
          currentPos[1] + d[1] * diff,
        ];

        if (board.boardMap[forwardPos[0]][forwardPos[1]] === ".") {
          answer.push(forwardPos);
        } else {
          break;
        }
        diff++;
      }
    }

    const returnValue = answer.map((el) => `${posIdxToFileObj[el[1]]}${el[0]}`);
    return returnValue;
  };
}

Bishop.prototype = new ChessPiece();
module.exports = Bishop;
