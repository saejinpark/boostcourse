class Stack {
    constructor() {
        this.stack = [];
        this.childStack = [];
        this.location = 0;
    }
    push(input) {
        this.addChild();
        this.stack[this.location] = input;
        this.location++;
    }
    read() {
        if (this.location) return this.stack[this.location - 1];
    }
    readChild() {
        if (this.location) return this.childStack[this.location - 1] == 0;
    }
    pop() {
        if (this.location) {
            let a = this.childStack[this.location - 1];
            delete this.stack[this.location - 1];
            delete this.childStack[this.location - 1];
            this.location--;
            return a;
        }
    }
    readAll() {
        let calls = [];
        for (let i = 0; i < this.location; i++) {
            calls.push([this.stack[i].name, this.stack[i].location]);
        }
        return calls;
    }
    clear() {
        this.stack = [];
        this.location = 0;
    }
    addChild() {
        if (this.location) {
            this.childStack[this.location - 1] += 1;
            this.childStack[this.location] = 0;
        } else {
            this.childStack[this.location] = 0;
        }
    }
}
module.exports = Stack;
