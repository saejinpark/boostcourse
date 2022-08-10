export default class Queue {
    data = [];
    constructor(data) {
        if(data) this.data = data;
    }
    
    push(el) {
        this.data.push(el);
        return this.data.length;
    }

    pop() {
        if(this.data.length == 0) return;
        return this.data.splice(0, 1);
    }
}