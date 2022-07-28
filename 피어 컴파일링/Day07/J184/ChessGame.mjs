import Board from "./Board.mjs"
import { createInterface } from "readline"; // ES6 모듈
const log = console.log;

const rl = createInterface(process.stdin, process.stdout);

const B = new Board();

function initBoard() { // 체스보드 초기화에 필요한 명령들.
    //Black
    B.initPiece("Pawn","A2");
    B.initPiece("Pawn","B2");
    B.initPiece("Pawn","C2");
    B.initPiece("Pawn","D2");
    B.initPiece("Pawn","E2");
    B.initPiece("Pawn","F2");
    B.initPiece("Pawn","G2");
    B.initPiece("Pawn","H2");
    B.initPiece("Rook","A1");
    B.initPiece("Rook","H1");
    B.initPiece("Knight","B1");
    B.initPiece("Knight","G1");
    B.initPiece("Bishop","C1");
    B.initPiece("Bishop","F1");
    B.initPiece("Queen","E1");

    // White
    B.initPiece("Pawn","A7");
    B.initPiece("Pawn","B7");
    B.initPiece("Pawn","C7");
    B.initPiece("Pawn","D7");
    B.initPiece("Pawn","E7");
    B.initPiece("Pawn","F7");
    B.initPiece("Pawn","G7");
    B.initPiece("Pawn","H7");
    B.initPiece("Rook","A8");
    B.initPiece("Rook","H8");
    B.initPiece("Knight","B8");
    B.initPiece("Knight","G8");
    B.initPiece("Bishop","C8");
    B.initPiece("Bishop","F8");
    B.initPiece("Queen","E8");
}

initBoard()

function printBoard() {
    for(let i=0;i<8;++i) {
        for(let j=0;j<8;++j){
            log(B.arr[i][j])
        }
    }
}
// printBoard()

let dis_arr = B.display(); // 배열 반환
function help_display() { // 실질 출력
    log("  A B C D E F G H")
    for(let i=0;i<8;++i) {
        let str = ""
        str += (i+1)
        str += " "
        for(let j=0;j<8;++j) {
            if(dis_arr[i][j]===0) {
                // process.stdout.write(".")
                str += "."
            }
            else if(dis_arr[i][j].type==="Pawn") {
                if(dis_arr[i][j].color==="White") {
                    //process.stdout.write("\u2659")
                    str += "\u2659"
                }
                else {
                    //process.stdout.write("\u265F")
                    str += "\u265F"
                }
            }
            else if(dis_arr[i][j].type==="Bishop") {
                if(dis_arr[i][j].color==="White") {
                    //process.stdout.write("\u2657")
                    str += "\u2657"
                }
                else {
                    // process.stdout.write("\u265D")
                    str += "\u265D"
                }
            }
            else if(dis_arr[i][j].type==="Rook") {
                if(dis_arr[i][j].color==="White") {
                    // process.stdout.write("\u2656")
                    str += "\u2656"
                }
                else {
                    // process.stdout.write("\u265C")
                    str += "\u265C"
                }
            }
            else if(dis_arr[i][j].type==="Queen") {
                if(dis_arr[i][j].color==="White") {
                    // process.stdout.write("\u2655")
                    str += "\u2655"
                }
                else {
                    // process.stdout.write("\u265B")
                    str += "\u265B"
                }
            }
            else if(dis_arr[i][j].type==="Knight") {
                if(dis_arr[i][j].color==="White") {
                    // process.stdout.write("\u2658")
                    str += "\u2658"
                }
                else {
                    // process.stdout.write("\u265E")
                    str += "\u265E"
                }
            }
            str += " "
        }
        log(str)
    }
}

help_display()

let turn = 0; // turn이 짝수 = White 차례
let input;

async function process_input() {
    process.stdout.write("명령을 입력하세요>")
    rl.on("line", (line) => {
        // 한 줄씩 입력받은 후 실행할 코드
        // 입력된 값은 line에 저장된다.
        input = line;
        // r1.close();
    });

    rl.on('close', () => {
        // 입력이 끝난 후 실행할 코드
        if(input[0]==="?") {
            let arr = await B.find_possible_pos(input.substr(1,))
        }
        else {
            // split해서 From, to 넣기
            inputarr = input.split("->")
            await B.move(inputarr[0], inputarr[1])
        }
    });
}

process_input()