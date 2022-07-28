const ChessPiece = require("./Piece");

function Pawn(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.icon = this.teamColor === "black" ? "\u265F" : "\u2659";

  // possiblePositions
  this.possiblePositions = function () {
    const possiblePosArr = [];

    if (this.teamColor === "white") {
      possiblePosArr.push(`${this.posFile}${this.posRank - 1}`);
    }
    if (this.teamColor === "black") {
      possiblePosArr.push(`${this.posFile}${this.posRank + 1}`);
    }

    return possiblePosArr;
  };

  this.filterUnavailablePos = function (arr) {
    const currentNo = Number(arr[0][1]);
    if (currentNo <= 8 && currentNo >= 1) return [arr[0]];
    else console.log("없음");
  };
}

Pawn.prototype = new ChessPiece();
module.exports = Pawn;
