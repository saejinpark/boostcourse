const { rank, file } = require("./type");

class Piece {
  position = [];

  setPosition(position) {
    const [r, f] = position;
    this.position = [rank[r], file[f]];
  }
}

class Pawn extends Piece {
  score = 1;
  maxCount = 8;
  isOneStep = true;

  constructor(color, position) {
    super();
    if (color === "black") {
      this.marker = "♟";
      this.possibleInitPostions = [
        [rank[2], file.A],
        [rank[2], file.B],
        [rank[2], file.C],
        [rank[2], file.D],
        [rank[2], file.E],
        [rank[2], file.F],
        [rank[2], file.G],
        [rank[2], file.H],
      ];
      this.directions = [[1, 0]];
    } else if (color === "white") {
      this.marker = "♙";
      this.possibleInitPostions = [
        [rank[7], file.A],
        [rank[7], file.B],
        [rank[7], file.C],
        [rank[7], file.D],
        [rank[7], file.E],
        [rank[7], file.F],
        [rank[7], file.G],
        [rank[7], file.H],
      ];
      this.directions = [[-1, 0]];
    }
    this.setPosition(position);
  }
}

class Bishop extends Piece {
  score = 3;
  maxCount = 2;
  directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  isOneStep = false;

  constructor(color, position) {
    super();
    if (color === "black") {
      this.marker = "♝";
      this.possibleInitPostions = [
        [rank[1], file.C],
        [rank[1], file.F],
      ];
    } else if (color === "white") {
      this.marker = "♗";
      this.possibleInitPostions = [
        [rank[8], file.C],
        [rank[8], file.F],
      ];
    }
    this.setPosition(position);
  }
}

class Knight extends Piece {
  score = 3;
  maxCount = 2;
  directions = [
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1],
    [1, -2],
    [1, 2],
    [-1, -2],
    [-1, 2],
  ];
  isOneStep = true;

  constructor(color, position) {
    super();
    if (color === "black") {
      this.marker = "♞";
      this.possibleInitPostions = [
        [rank[1], file.B],
        [rank[1], file.G],
      ];
    } else if (color === "white") {
      this.marker = "♘";
      this.possibleInitPostions = [
        [rank[8], file.B],
        [rank[8], file.G],
      ];
    }

    this.setPosition(position);
  }
}

class Rook extends Piece {
  score = 5;
  maxCount = 2;
  directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  isOneStep = false;

  constructor(color, position) {
    super();
    if (color === "black") {
      this.marker = "♜";
      this.possibleInitPostions = [
        [rank[1], file.A],
        [rank[1], file.H],
      ];
    } else if (color === "white") {
      this.marker = "♖";
      this.possibleInitPostions = [
        [rank[8], file.A],
        [rank[8], file.H],
      ];
    }

    this.setPosition(position);
  }
}

class Queen extends Piece {
  score = 9;
  maxCount = 1;
  directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  isOneStep = true;

  constructor(color, position) {
    super();
    if (color === "black") {
      this.marker = "♛";
      this.possibleInitPostions = [[rank[1], file.E]];
    } else if (color === "white") {
      this.marker = "♕";
      this.possibleInitPostions = [[rank[8], file.E]];
    }

    this.setPosition(position);
  }
}

module.exports = {
  Pawn,
  Bishop,
  Knight,
  Rook,
  Queen,
};
