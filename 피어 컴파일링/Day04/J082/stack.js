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

    return(baseLine, name) {
        const unCollectHeapArr = [];
        while (this.memory.getLength() !== baseLine) {
            const testCase = this.memory.pop().getValue();
            if(testCase !== name){
                unCollectHeapArr.push(testCase);
            }
        }
        return unCollectHeapArr;
    }

    getIndexName(index) {
        return this.memory.getByIndexKey(index);
    }

    getMemoryToStringArr() {
        return this.memory.getNodeToStringArr();
    }
}
