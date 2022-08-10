import Emitter from "./emitter.js";
import Queue from "./queue.js";


// 주문 리스트

export default class OrderList {
    static #instance;
    emitter = new Emitter();
    list = new Queue();
    constructor() { // singleton
        if(OrderList.#instance) return OrderList.#instance;
        else OrderList.#instance = this;
        this.emitter.add(this, 'newInput', undefined, (m) => {
            //console.log("OrderList : newInput eventHandler called");
            this.list.push(m.data)
        })
        this.emitter.add(this, 'chefDone', undefined, (m) => {
            /*
            console.log("OrderList: chefFinished eventhandler")
            console.log(m.data);
            console.log(JSON.stringify(this.list));
            */

            for(var i=0; i<this.list.data.length; i++) {
                for(var j=0; j<this.list.data[i].orders.length; j++) {
                    let row = this.list.data[i].orders[j];
                    if(row.name === m.data.menu.name) {
                        //console.log(row);
                        row.count = row.count - 1;
                        if(this.list.data[i].orders.length === 1) {
                            if(row.count === 0) {
                                // 모든 음식 준비가 완료되어 배달을 출발함
                                console.log(this.list.data[i].name + "의 음식 준비가 되었습니다");
                                this.emitter.emit('orderFoodCompleted', this, {name : this.list.data[i].name});
                                this.list.data.splice(i, 1);
                            } 
                        } else if(row.count === 0) {
                            // 준비가 완료된 음식 항목을 삭제
                            this.list.data[i].orders.splice(j, 1);
                        }
                        return;
                    }
                }
            }
        })
        
    }
    
    push(el) {
        let ret = this.list.push(el);
        this.emitter.emit('newOrder', this, el);
        return ret;
    }

    pop() {
        return this.list.pop();
    }
}