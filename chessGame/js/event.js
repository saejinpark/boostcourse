const createMoveButton = (board, file, rank, td, piece, addFile, addRank) => {
    const nextFile = file + addFile;
    const nextRank = rank + addRank;
    let nextMove = true;
    if (1 <= nextFile && nextFile <= 8 && 1 <= nextRank && nextRank <= 8) {
        const nextAreaPiece = board.getPiece(nextFile, nextRank);
        if (nextAreaPiece !== board.getDummy()) {
            nextMove = false;
        }
        if (nextAreaPiece.getColor() !== piece.getColor()) {
            const button = document.createElement("button");
            button.className = "button move";
            button.dataset.type = piece.getType();
            button.dataset.color = piece.getColor();
            const i = document.createElement("i");
            i.className = `fa-solid fa-chess-${piece.getType()}`;
            button.appendChild(i);
            button.style.transform = `translate(${addRank * 100}%, ${
                addFile * 100
            }%)`;
            button.addEventListener("click", (e) => {
                e.preventDefault();
                board.move(file, rank, file + addFile, rank + addRank);
                board.addTurn();
                board.display();
            });
            td.appendChild(button);
        }
    } else {
        nextMove = false;
    }

    return nextMove;
};

const showMoveButton = (board, file, rank, td, piece) => {
    switch (piece.getType()) {
        case "pawn":
            {
                if (piece.getColor() === "white") {
                    createMoveButton(board, file, rank, td, piece, -1, 0);

                    if (piece.getMove() === 0) {
                        createMoveButton(board, file, rank, td, piece, -2, 0);
                    }
                } else {
                    createMoveButton(board, file, rank, td, piece, 1, 0);
                    if (piece.getMove() === 0) {
                        createMoveButton(board, file, rank, td, piece, 2, 0);
                    }
                }
            }
            break;
    }
};

export const setChessEvent = (board) => {
    const table = document.querySelector(".table");
    const fileTableRows = table.querySelectorAll("tr[data-file]");
    fileTableRows.forEach((tr) => {
        const rankTableDatas = tr.querySelectorAll("td[data-rank]");
        rankTableDatas.forEach((td) => {
            const chessman = td.querySelector(".piece");
            if (chessman !== null) {
                chessman.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (chessman.classList.contains("active")) {
                        chessman.classList.remove("active");
                        board.display();
                    } else {
                        chessman.classList.add("active");
                        const file = parseInt(tr.dataset.file);
                        const rank = parseInt(td.dataset.rank);
                        const piece = board.getPiece(file, rank);
                        showMoveButton(board, file, rank, td, piece);
                    }
                });
            }
        });
    });
};
