class Node {
    constructor(item) {
        this.item = item;
        this.prev = this.prev;
    }
}
class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(item) {
        const node = new Node(item);
        if (this.size != 0) node.prev = this.top;
        this.top = node;
        this.size += 1;
    }

    pop() {
        if (this.size == 0) return null;
        const curr = this.top;
        this.top = this.top.prev;
        this.size -= 1;
        return curr.item;
    }
    clear() {
        this.top = null;
        this.size = 0;
    }
}

module.exports = {
    Stack: Stack,
};
