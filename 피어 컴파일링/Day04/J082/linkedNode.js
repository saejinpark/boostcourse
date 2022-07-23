export class LinkedNode {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }

    getValue() {
        return this.val;
    }

    setValue(val) {
        this.val = val;
    }

    getPrevNode() {
        return this.prev;
    }

    setPrevNode(node) {
        this.prev = node;
    }

    getNextNode() {
        return this.next;
    }

    setNextNode(node) {
        this.next = node;
    }
}
