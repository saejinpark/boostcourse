import { LinkedList } from "./linkedList.js";

export class Stack {
    constructor(size) {
        this.memory = new LinkedList(size, 0, 1);
    }
    getStackPointer() {
        return this.memory.getKeyArr();
    }
    add(index) {
        return this.memory.push(index);
    }

    clear(pointer) {
        return this.memory.spliceByKey(pointer);
    }

    getLength() {
        return this.memory.getLength();
    }

    return(name) {
        while (this.memory.getByIndexValue(this.memory.getLength() - 1) === name) {
            this.memory.pop();
        }
    }

    getIndexName(index) {
        return this.memory.getByIndexKey(index);
    }
    
    getMemoryToStringArr() {
        return this.memory.getNodeToStringArr();
    }
}
