import readline from 'readline';
import Emitter from './emitter.js';


const rl = readline.createInterface({input: process.stdin, output: process.stdout});

// const menu = [[1, '라면', 3], [2, '떡볶이', 7], [3, '닭볶음탕', 15], [4, '갈비찜', 20]];
import { menu } from './global.js';

export default class POS {
    static #instance;
    emitter = new Emitter();

    constructor() { // singleton
        if(POS.#instance) return POS.#instance;
        else POS.#instance = this;
    }
    
    run() {
        console.log("메뉴 = 1. 라면(3분) 2. 떡볶이(7분) 3. 닭볶음탕(15분) 4. 갈비찜(20분)");
        rl.setPrompt("고객별로 주문할 음식 개수를 입력하세요. 예) A고객, 라면 2개, 떡볶이 1개 => A, 1:2, 3:1 >");
        rl.prompt();
        this.emitter.add(this, '', undefined, (e) => {rl.prompt()})
        rl.on("line", async (l) => {
            rl.setPrompt(">");
            //console.log(l.match(/\d:\d/))
            if(l.match(/([\w])+(, \d:\d)*/) === null) {
                console.log("유효하지 않은 입력입니다.");
                rl.prompt();
                return;
            }
            const row = l.split(', ');
            
            const customerName = row.splice(0, 1)[0];
            let orders = [];
            for(var i=0; i<row.length; i++) {
                let singleOrder = row[i].split(':');
                if(!menu.get(parseInt(singleOrder[0]))) {
                    console.log("유효하지 않은 입력입니다.");
                    rl.prompt();
                    return;
                }
                let item = {key: parseInt(singleOrder[0]), name: menu.get(parseInt(singleOrder[0]))[0], time : menu.get(parseInt(singleOrder[0]))[1], count: singleOrder[1]};
                orders.push(item);
                for(var j=0; j<singleOrder[1]; j++) this.emitter.emit('newTaskInput', this, {menu : item});
            }
            if(orders.length === 0) {
                console.log("유효하지 않은 입력입니다.");
                rl.prompt();
                return;
            }
            //const food = menu.get(parseInt(row[0]));
            
            //let ret = {menu : {key : parseInt(row[0]), name : food[0], time : parseInt(food[1])}, count:parseInt(row[1])};
            //let ret = {menu : {key : parseInt(row[0]), name : food[0], time : parseInt(food[1])}};
            
            this.emitter.emit('newInput', this, {name: customerName, orders: orders});
            
            rl.prompt();
        })
    }
    
}