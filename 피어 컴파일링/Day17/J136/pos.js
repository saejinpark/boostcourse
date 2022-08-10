export class Pos {
    constructor(){
        this.q = [];
    }
    
    // 주문 받기 
    addMenu(arr){
        this.q.push(arr);
    }
}