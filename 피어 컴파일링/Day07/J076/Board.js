const { BOARD_PIECE_BLACK, BOARD_PIECE_WHITE } = require("./board-piece");
const { posFileToIdxObj } = require("./util");

const Pawn = require("./Pawn");
const Rook = require("./Rook");
const Knight = require("./Knight");
const Bishop = require("./Bishop");
const Queen = require("./Queen");

function ChessBoard() {
  this.boardMap = [
    [" ", "A", "B", "C", "D", "E", "F", "G", "H"],
    ["1", ".", ".", ".", ".", ".", ".", ".", "."],
    ["2", ".", ".", ".", ".", ".", ".", ".", "."],
    ["3", ".", ".", ".", ".", ".", ".", ".", "."],
    ["4", ".", ".", ".", ".", ".", ".", ".", "."],
    ["5", ".", ".", ".", ".", ".", ".", ".", "."],
    ["6", ".", ".", ".", ".", ".", ".", ".", "."],
    ["7", ".", ".", ".", ".", ".", ".", ".", "."],
    ["8", ".", ".", ".", ".", ".", ".", ".", "."],
    [" ", "A", "B", "C", "D", "E", "F", "G", "H"],
  ];

  this.showBoard = function () {
    this.boardMap.forEach((el) => console.log(el.join("")));
  };

  this.getBoardMap = function () {
    return this.boardMap;
  };

  this.setBoardMap = function (position, unicode) {
    this.boardMap[position[0]][position[1]] = unicode;
  };

  // 전체 포지션을 체스말에 구축하기
  this.initPosition = function () {
    this.initPositionByColor("black");
    this.initPositionByColor("white");
    this.displayBoard(this.boardMap, BOARD_PIECE_BLACK, BOARD_PIECE_WHITE);
  };

  this.initPositionByColor = function (color) {
    const pawnRank = color === "black" ? 2 : 7;
    const notPawnRank = color === "black" ? 1 : 8;

    const initPositionOfPawn = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const initPositionOfRook = ["A", "H"];
    const initPositionOfKnight = ["B", "G"];
    const initPositionOfBishop = ["C", "F"];

    const currentObject =
      color === "black" ? BOARD_PIECE_BLACK : BOARD_PIECE_WHITE;

    // Pawn을 초기화하기
    initPositionOfPawn.forEach((el, idx) => {
      currentObject.set(
        `pawn_${idx + 1}`,
        this.initPiece("pawn", [el, pawnRank])
      );
      currentObject.get(`pawn_${idx + 1}`).teamColor = color;
    });

    // Rook을 초기화하기
    initPositionOfRook.forEach((el, idx) => {
      currentObject.set(
        `rook_${idx + 1}`,
        this.initPiece("rook", [el, notPawnRank])
      );
      currentObject.get(`rook_${idx + 1}`).teamColor = color;
    });

    // Knight을 초기화하기
    initPositionOfKnight.forEach((el, idx) => {
      currentObject.set(
        `knight_${idx + 1}`,
        this.initPiece("knight", [el, notPawnRank])
      );
      currentObject.get(`knight_${idx + 1}`).teamColor = color;
    });

    // Bishop을 초기화하기
    initPositionOfBishop.forEach((el, idx) => {
      currentObject.set(
        `bishop_${idx + 1}`,
        this.initPiece("bishop", [el, notPawnRank])
      );
      currentObject.get(`bishop_${idx + 1}`).teamColor = color;
    });

    // Queen을 초기화하기
    currentObject["queen_1"] = currentObject.set(
      `queen_1`,
      this.initPiece("queen", ["E", notPawnRank])
    );
  };

  // initPiece
  this.initPiece = function (type, position) {
    if (type === "pawn") {
      if (position[1] === 2) return new Pawn(position[0], position[1], "black");
      if (position[1] === 7) return new Pawn(position[0], position[1], "white");
    }
    if (type === "rook") {
      if (position[1] === 1) return new Rook(position[0], position[1], "black");
      if (position[1] === 8) return new Rook(position[0], position[1], "white");
    }
    if (type === "knight") {
      if (position[1] === 1)
        return new Knight(position[0], position[1], "black");
      if (position[1] === 8)
        return new Knight(position[0], position[1], "white");
    }
    if (type === "bishop") {
      if (position[1] === 1)
        return new Bishop(position[0], position[1], "black");
      if (position[1] === 8)
        return new Bishop(position[0], position[1], "white");
    }

    if (type === "queen") {
      if (position[1] === 1)
        return new Queen(position[0], position[1], "black");
      if (position[1] === 8)
        return new Queen(position[0], position[1], "white");
    }
  };

  // setPiece
  this.setPiece = function (type, position) {};

  // move
  this.move = function (from, to) {
    if (this.boardMap[to[1]][posFileToIdxObj[to[0]]] !== ".") return false;

    for (const [key, val] of [...BOARD_PIECE_BLACK.entries()]) {
      if (from[0] === val.posFile && Number(from[1]) === val.posRank) {
        val.posFile = to[0];
        val.posRank = to[1];
        BOARD_PIECE_BLACK.set(key, val);
        this.boardMap[from[1]][posFileToIdxObj[from[0]]] = ".";
      }
    }

    for (const [key, val] of [...BOARD_PIECE_WHITE.entries()]) {
      if (from[0] === val.posFile && Number(from[1]) === val.posRank) {
        val.posFile = to[0];
        val.posRank = Number(to[1]);
        BOARD_PIECE_WHITE.set(key, val);
        this.boardMap[from[1]][posFileToIdxObj[from[0]]] = ".";
      }
    }

    this.displayBoard(this.boardMap, BOARD_PIECE_BLACK, BOARD_PIECE_WHITE);
    return true;
  };

  // displayBoard
  this.displayBoard = function (board, blackPieces, whitePieces) {
    blackPieces.forEach((el) => {
      board[el.posRank][posFileToIdxObj[el.posFile]] = el.icon;
    });

    whitePieces.forEach((el) => {
      board[el.posRank][posFileToIdxObj[el.posFile]] = el.icon;
    });

    this.showBoard();
  };
}

module.exports = ChessBoard;
