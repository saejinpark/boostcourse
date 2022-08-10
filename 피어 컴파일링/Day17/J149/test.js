/*
// 같은 함수를 여러번 중첩하여 실행할 수 있음, 변수를 공유하지 않음

async function callme() {
    var i = 0;
    console.log("start" + i);
    i++;
    await wait(1000);
    i++;
    console.log("end" + i);
    return;
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms))}

setInterval(callme, 500);
*/


/*
// 싱글톤 검증
import Emitter from "./emitter.js";
import Queue from "./queue.js";

const e = new Emitter();
e.table.push(1);
e.table.push(2);
const q = new Queue();
console.log(q.t);

*/