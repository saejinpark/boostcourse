import Emitter from "./emitter.js";
import Manager from "./manager.js";

export default class Dashboard {
    static #instance;
    e = new Emitter();
    m = new Manager();
    board = new Map(); // key -> [이름, 총주문수, 요리완]
    deliveryBoard = [];

    constructor() { // singleton
        if(Dashboard.#instance) return Dashboard.#instance;
        else Dashboard.#instance = this;
        this.e.add(this, 'chefFinished', undefined, (e) => {
            this.addFood(e);
        })
        
        this.e.add(this, 'newOrder', undefined, (e) => {
            this.addOrder(e);
        })

        this.e.add(this, 'startDelivery', undefined, (e) => {
            const name = e.data.name;
            this.deliveryBoard.push(name);
            this.display();
        })

        this.e.add(this, 'DeliveryDone', undefined, (e) => {
            const idx = this.deliveryBoard.indexOf(e.data.name);
            this.deliveryBoard.splice(idx, 1);
            console.log(e.data.name + " 손님에게로의 배달이 완료되었습니다. 야호!");
        })
        
    }

    addFood(e) {
        //console.log("addFood")
        //console.log(e);
        let menu = this.board.get(e.data.menu.key);
        if(!menu) {
            this.board.set(e.data.menu.key, [e.data.menu.name, 1, 1]);
        } else {
            this.board.set(e.data.menu.key, [ menu[0], menu[1], menu[2]+1 ]);
        }
        this.display();
    }

    addOrder(e) {
        //console.log("addOrder")
        let menu = this.board.get(e.data.menu.key);
        if(!menu) {
            this.board.set(e.data.menu.key, [e.data.menu.name, 1, 0]);
        } else {
            this.board.set(e.data.menu.key, [ menu[0], menu[1] + 1, menu[2] ]);
        }
        //this.display();
    }

    display() {
        console.log("\n\nDashboard-------------------------------------------------")
        //console.log(this.board);
        this.board.forEach((i, k, m) => {
            console.log(i[0]+ " : 현재 " + i[2] +"개 완료, " + " 남은 주문 " + (i[1] - i[2]) + "개");
        })
        console.log("배달 현황--------------------------------------------------");
        this.deliveryBoard.forEach(el => {
            console.log(el + " 배달중 ...");
        })
        console.log("end of Dashboard---------------------------------------------");
    }
}