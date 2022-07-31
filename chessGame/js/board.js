import { Piece } from "./chessmen/piece.js";
import { Pawn } from "./chessmen/pawn.js";
import { Rook } from "./chessmen/rook.js";
import { Knight } from "./chessmen/knight.js";
import { Bishop } from "./chessmen/bishop.js";
import { King } from "./chessmen/king.js";
import { Queen } from "./chessmen/queen.js";
import { setChessEvent } from "./event.js";

export class Board {
    constructor() {
        this.turn = 0;
        this.fileMap = new Map();
        this.dummy = new Piece();
    }
    init() {
        for (let file = 1; file <= 8; file++) {
            const rankMap = new Map();
            for (let rank = 1; rank <= 8; rank++) {
                rankMap.set(rank, this.dummy);
            }
            this.addFileMap(file, rankMap);
        }
        for (let rank = 1; rank <= 8; rank++) {
            switch (rank) {
                case 1:
                case 8:
                    this.initPiece("rook", "black", 1, rank);
                    this.initPiece("pawn", "black", 2, rank);
                    this.initPiece("pawn", "white", 7, rank);
                    this.initPiece("rook", "white", 8, rank);
                    break;
                case 2:
                case 7:
                    this.initPiece("knight", "black", 1, rank);
                    this.initPiece("pawn", "black", 2, rank);
                    this.initPiece("pawn", "white", 7, rank);
                    this.initPiece("knight", "white", 8, rank);
                    break;
                case 3:
                case 6:
                    this.initPiece("bishop", "black", 1, rank);
                    this.initPiece("pawn", "black", 2, rank);
                    this.initPiece("pawn", "white", 7, rank);
                    this.initPiece("bishop", "white", 8, rank);
                    break;
                case 4:
                    this.initPiece("queen", "black", 1, rank);
                    this.initPiece("pawn", "black", 2, rank);
                    this.initPiece("pawn", "white", 7, rank);
                    this.initPiece("queen", "white", 8, rank);
                    break;
                case 5:
                    this.initPiece("king", "black", 1, rank);
                    this.initPiece("pawn", "black", 2, rank);
                    this.initPiece("pawn", "white", 7, rank);
                    this.initPiece("king", "white", 8, rank);
                    break;
            }
        }
        this.display();
    }

    display() {
        const table = document.querySelector(".table");
        this.getFileMap().forEach((rankMap, file) => {
            const tr = table.querySelector(`tr[data-file='${file}']`);
            rankMap.forEach((piece, rank) => {
                const td = tr.querySelector(`td[data-rank="${rank}"]`);
                td.innerHTML = "";
                const inner = piece.getInner();
                if (inner !== null) td.appendChild(piece.getInner());
            });
        });
        const blackPieces = table.querySelectorAll('[data-color = "black"]');
        const whitePieces = table.querySelectorAll('[data-color = "white"]');
        if (this.getTurn() % 2 === 0) {
            whitePieces.forEach((piece) => {
                piece.classList.remove("pointer_event_none");
            });
            blackPieces.forEach((piece) => {
                piece.classList.add("pointer_event_none");
            });
        } else {
            whitePieces.forEach((piece) => {
                piece.classList.add("pointer_event_none");
            });
            blackPieces.forEach((piece) => {
                piece.classList.remove("pointer_event_none");
            });
        }
        setChessEvent(this);
    }

    addFileMap(file, rankMap) {
        this.fileMap.set(file, rankMap);
    }

    getFileMap() {
        return this.fileMap;
    }
    getRankMap(file) {
        return this.getFileMap().get(file);
    }

    getPiece(file, rank) {
        return this.getRankMap(file).get(rank);
    }

    setPiece(file, rank, piece) {
        this.getRankMap(file).set(rank, piece);
    }

    initPiece(type, color, file, rank) {
        switch (type) {
            case "pawn":
                this.getRankMap(file).set(rank, new Pawn(color));
                break;

            case "rook":
                this.getRankMap(file).set(rank, new Rook(color));
                break;

            case "knight":
                this.getRankMap(file).set(rank, new Knight(color));
                break;

            case "bishop":
                this.getRankMap(file).set(rank, new Bishop(color));
                break;

            case "king":
                this.getRankMap(file).set(rank, new King(color));
                break;

            case "queen":
                this.getRankMap(file).set(rank, new Queen(color));
                break;
        }
    }

    move(nowFile, nowRank, nextFile, nextRank) {
        const piece = this.getPiece(nowFile, nowRank);
        piece.addMove();
        this.setPiece(nextFile, nextRank, piece);
        this.setPiece(nowFile, nowRank, this.getDummy());
        this.display();
    }

    getTurn() {
        return this.turn;
    }
    addTurn() {
        this.turn++;
    }

    getDummy() {
        return this.dummy;
    }
}
