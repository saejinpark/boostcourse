// 색상은 생성할 때 결정하고 변경할 수 없어야 한다.
// 색상은 다형성으로 동작하도록 한다.

// 체스말은 현재 위치 Position을 기준으로 이동할 수 있는 모든 위치를 리턴하는 possiblePositions() 함수를 제공한다.
// 다른 말이 있는지 여부는 판단하지 않는다.

function Piece(posFile, posRank, teamColor) {
  this.posFile = posFile;
  this.posRank = posRank;
  this.teamColor = teamColor;
  this.posFileToIdxObj = Object.freeze({
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
  });

  this.getPosOnBoard = function () {
    return [this.posFileToIdxObj[this.posFile], Number(this.posRank)];
  };
}

module.exports = Piece;
