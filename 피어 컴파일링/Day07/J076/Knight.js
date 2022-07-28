const ChessPiece = require("./Piece");
const { fileArray, posIdxToFileObj, posFileToIdxObj } = require("./util");

function Knight(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.icon = this.teamColor === "black" ? "\u265E" : "\u2658";

  // possiblePositions
  this.possiblePositions = function () {
    const result = [];
    const fileIdx = fileArray.indexOf(posFile) + 1;
    const posIdx = posRank;
    const dir = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    result.push([fileIdx - 1, posIdx - 2]);
    result.push([fileIdx + 1, posIdx - 2]);
    result.push([fileIdx - 1, posIdx + 2]);
    result.push([fileIdx + 1, posIdx + 2]);
    result.push([fileIdx + 2, posIdx - 1]);
    result.push([fileIdx + 2, posIdx + 1]);
    result.push([fileIdx - 2, posIdx - 1]);
    result.push([fileIdx - 2, posIdx + 1]);

    const returnArr = result
      .filter((el) => el[0] >= 1 && el[0] <= 8 && el[1] >= 1 && el[1] <= 8)
      .map((el) => posIdxToFileObj[el[0]] + el[1]);

    this.filterUnavailablePos = function (arr, board) {
      const answer = [];
      const currentPos = [posFileToIdxObj[posFile], posRank];
      dir.forEach((el, idx) => {
        const forwardPos = [currentPos[1] + el[1], currentPos[0] + el[0]];
        if (
          forwardPos[0] <= 8 &&
          forwardPos[0] >= 0 &&
          forwardPos[1] <= 8 &&
          forwardPos[1] >= 0
        ) {
          if (board.boardMap[forwardPos[0]][forwardPos[1]] === ".") {
            console.log([forwardPos[0], forwardPos[1]]);
            if (idx === 0) {
              answer.push(
                ...arr.filter((i) => Number(i[1]) === forwardPos[0] + 1)
              );
            }
            if (idx === 1) {
              answer.push(
                ...arr.filter((i) => Number(i[1]) === forwardPos[0] - 1)
              );
            }
            if (idx === 2) {
              answer.push(
                ...arr.filter(
                  (el) =>
                    el[0] ===
                    (forwardPos[0] + 1 >= 0 && forwardPos[1] + 1 <= 8
                      ? posIdxToFileObj[forwardPos[1] + 1]
                      : null)
                )
              );
            }
            if (idx === 3) {
              answer.push(
                ...arr.filter(
                  (el) =>
                    el[0] ===
                    (forwardPos[0] - 1 >= 0 && forwardPos[1] - 1 <= 8
                      ? posIdxToFileObj[forwardPos[1] - 1]
                      : null)
                )
              );
            }
          }
        }
      });

      return answer;
    };

    return returnArr;
  };
}

Knight.prototype = new ChessPiece();
module.exports = Knight;
