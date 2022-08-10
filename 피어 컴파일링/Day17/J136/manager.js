export class Manager {
    constructor(){
        this.crrOrder = null;
    }
    // pos에서 가장 먼저 들어온 주문 가져오기
    getOrder(pos){
        if(pos.q.length !== 0){
            this.crrOrder = pos.q.shift();
            return true;
        }
    }

}