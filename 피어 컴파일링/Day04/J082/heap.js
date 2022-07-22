import { LinkedList } from "./linkedList.js";

export class Heap {
    constructor(size, start) {
        this.memory = new LinkedList(size, start, -1);
    }

    getLength() {
        return this.memory.getLength();
    }

    add(data) {
        return this.memory.unshift(data);
    }

    getHeapPointer() {
        return this.memory.getKeyArr();
    }

    clear(pointer) {
        return this.memory.spliceByKey(pointer);
    }

    garbageCheck(collectHeapMap) {
        let start = 0;
        let end = this.memory.length - 1;
        while (start < end) {
            const testCase = this.memory.getByIndexKey(start);
            if (!collectHeapMap.has(testCase)) {
                this.memory.spliceByKey(testCase);
            }
            start++;
            end = this.memory.length - 1;
        }
    }

    getMemoryToStringArr() {
        return this.memory.getNodeToStringArr().reverse();
    }
}
