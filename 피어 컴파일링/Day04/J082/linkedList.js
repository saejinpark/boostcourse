import { LinkedNode } from "./linkedNode.js";

export class LinkedList {
    constructor(size, start, unit) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.keyArr = [];
        for (let i = 0; i < size; i++) {
            this.keyArr.push("0x" + start.toString(16).padStart(4, "0"));
            start += unit;
        }
        this.tempKeyArr = this.keyArr.slice();
        this.nodeKeyArr = [];
        this.nodeMap = new Map();
    }

    getKeyArr() {
        return this.keyArr;
    }

    getByIndexKey(index) {
        try {
            return this.nodeKeyArr[index];
        } catch {
            console.log("유효하지 못한 인덱스 값입니다.");
            return null;
        }
    }

    getByIndexValue(index) {
        try {
            return this.nodeMap.get(this.nodeKeyArr[index]).getValue();
        } catch {
            console.log("유효하지 못한 인덱스 값입니다.");
            return null;
        }
    }

    getByIndex(index) {
        try {
            return this.nodeMap.get(this.nodeKeyArr[index]);
        } catch {
            console.log("유효하지 못한 인덱스 값입니다.");
            return null;
        }
    }

    getByKey(key) {
        try {
            return this.nodeMap.get(key);
        } catch {
            console.log("유효하지 못한 키 값입니다.");
            return null;
        }
    }

    getLength() {
        return this.length;
    }

    push(value) {
        if (this.keyArr.length !== 0) {
            const node = new LinkedNode(value);
            if (this.tail === null) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail.setNextNode(node);
                node.setPrevNode(this.tail);
                this.tail = node;
            }
            const pushKey = this.keyArr.shift();
            this.nodeKeyArr.push(pushKey);
            this.nodeMap.set(pushKey, node);
            this.length++;
            return pushKey;
        } else {
            console.log("메모리초과 입니다.");
        }
    }

    unshift(value) {
        if (this.keyArr.length !== 0) {
            const node = new LinkedNode(value);
            if (this.tail == null) {
                this.head = node;
                this.tail = node;
            } else {
                this.head.setPrevNode(node);
                node.setNextNode(this.head);
                this.head = node;
            }
            const unshiftKey = this.keyArr.shift();
            this.nodeKeyArr.unshift(unshiftKey);
            this.nodeMap.set(unshiftKey, node);
            this.length++;
            return unshiftKey;
        } else {
            console.log("메모리초과 입니다.");
        }
    }

    pop() {
        if (this.length !== 0) {
            const popKey = this.nodeKeyArr.pop();
            const node = this.tail;
            this.tail = node.getPrevNode();
            this.tail.setNextNode(null);
            this.nodeMap.delete(popKey);
            this.keyArr.unshift(popKey);
            this.length--;
            return node;
        } else {
            console.log("메모리가 비었습니다.");
        }
    }

    shift() {
        if (this.length !== 0) {
            const shiftKey = this.nodeKeyArr.shift();
            const node = this.head;
            this.head = node.getNextNode();
            this.head.setPrevNode(null);
            this.nodeMap.delete(shiftKey);
            this.keyArr.unshift(shiftKey);
            this.length--;
            return node;
        } else {
            console.log("메모리가 비었습니다.");
        }
    }

    print() {
        this.nodeKeyArr.forEach((element, index) => {
            const node = this.nodeMap.get(element);
            console.log(
                `index : ${("" + index).padStart(
                    3,
                    " "
                )}, key: ${element}, value : ${node.getValue()}`
            );
        });
    }

    spliceByKey(key) {
        const splicedNode = this.getByKey(key);
        const prev = splicedNode.getPrevNode();
        const next = splicedNode.getNextNode();
        if (splicedNode === this.head) {
            this.head = prev;
        }
        if (splicedNode === this.tail) {
            this.tail = next;
        }
        if (prev !== null && next !== null) {
            prev.setNextNode(next);
            next.setPrevNode(prev);
        } else if (prev === null && next !== null) {
            next.getPrevNode(null);
        } else if (prev !== null && next === null) {
            prev.getNextNode(null);
        }
        this.keyArr.unshift(key);
        this.nodeKeyArr.splice(this.nodeKeyArr.indexOf(key), 1);
        this.nodeMap.delete(key);
        this.length--;
        return splicedNode.getValue();
    }

    getNodeToStringArr() {
        const nodeToStringArr = [];
        this.tempKeyArr.forEach((key) => {
            if (this.nodeMap.has(key)) {
                nodeToStringArr.push(
                    `[${key}](${this.nodeMap
                        .get(key)
                        .getValue()
                        .padStart(8, " ")})`
                );
            } else {
                nodeToStringArr.push(`[${key}](        )`);
            }
        });
        return nodeToStringArr;
    }
}
