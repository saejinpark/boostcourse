import { Stack } from "./stack.js";
import { Heap } from "./heap.js";

export class Memory {
    constructor() {
        this.stackSize = 0;
        this.heapSize = 0;
        this.memoryLength = 0;
        this.stack = null;
        this.heap = null;
        this.typeMap = new Map();
        this.callArr = [];
        this.heapStatusArr = [];
        this.collectHeapMap = new Map();
    }

    init(stackSize, heapSize) {
        this.stackSize = stackSize;
        this.heapSize = heapSize;
        this.memoryLength = stackSize + heapSize;
        this.stack = new Stack(stackSize);
        this.heap = new Heap(heapSize, this.memoryLength - 1);
        return { command: "init", stackSize, heapSize };
    }

    getTypeMap() {
        return this.typeMap;
    }

    setSize(type, length) {
        if (this.typeMap.has(type)) {
            return { command: "error", info: "이미 지정된 타입 입니다." };
        } else if (!length in [1, 2, 4, 8, 16, 32]) {
            return { command: "error", info: "지정될 수 없는 사이즈 입니다." };
        } else {
            this.typeMap.set(type, length);
        }
        return { command: "setSize", type, length };
    }

    malloc(type, count) {
        let data = "FF".repeat(this.typeMap.get(type));
        if (data.length < 16) data = data.padStart(16, "00");
        for (let i = 0; i < count; i++) {
            const stackPointerArr = [];
            const dataPartArr = data.match(/\w{8}/g);
            dataPartArr.forEach((dataPart) => {
                const collectHeapPointer = this.heap.add(`${"0x" + dataPart}`);
                stackPointerArr.push(this.stack.add(collectHeapPointer));
                this.collectHeapMap.set(collectHeapPointer, true);
            });
            const stackStatus = {
                type,
                length: this.typeMap.get(type),
                stackPointerArr,
            };
            this.heapStatusArr.push(stackStatus);
        }
        return { command: "malloc", type, count };
    }

    free(pointer) {
        this.heap.clear(this.stack.clear(pointer));
        return { command: "free", pointer };
    }

    call(name, paramCount) {
        const baseLine = this.stack.getLength();
        for (let i = 0; i < paramCount; i++) {
            this.stack.add(name);
        }
        this.callArr.unshift({ baseLine, name, paramCount });
        return { command: "call", name, paramCount };
    }

    returnFrom(name) {
        if (this.callArr[0]["name"] === name) {
            const baseLine = this.callArr.shift()["baseLine"];
            const unCollectHeapArr = this.stack.return(baseLine, name);
            unCollectHeapArr.forEach((unCollectHeap) => {
                this.collectHeapMap.delete(unCollectHeap);
            });
            return { command: "returnFrom", name };
        } else {
            return { command: "error", info: "최근에 호출된 name이 아닙니다." };
        }
    }

    usage() {
        const stackMemory = this.stackSize;
        const usingStackMemory = this.stack.getLength();
        const remainStackMemory = stackMemory - usingStackMemory;
        const heapMemory = this.heapSize;
        const usingHeapMemory = this.heap.getLength();
        const remainHeapMemory = heapMemory - usingHeapMemory;

        return {
            command: "usage",
            stackMemory,
            usingStackMemory,
            remainStackMemory,
            heapMemory,
            usingHeapMemory,
            remainHeapMemory,
        };
    }

    callstack() {
        let nameIndex = this.stack.getLength() - 1;
        const calls = [];
        this.callArr.forEach((element) => {
            const { name, paramCount } = element;
            for (let i = 0; i < paramCount; i++) {
                if (i === paramCount - 1) {
                    calls.push(
                        `${name}() ${this.stack.getIndexName(nameIndex)}`
                    );
                } else if (i === 0) {
                    calls.push(
                        `${name}() ${this.stack.getIndexName(nameIndex)} ->`
                    );
                } else {
                    calls.push(
                        `${name}() ${this.stack.getIndexName(nameIndex)} ->`
                    );
                }
                if ((i + 1) % 5 === 0) {
                    calls.push("\n");
                }
                nameIndex--;
            }
        });
        return { command: "callstack", calls };
    }

    heapdump() {
        return {
            command: "heapdump",
            heapStatusArr: this.heapStatusArr,
        };
    }

    garbageCollect() {
        this.heap.garbageCheck(this.collectHeapMap);
        return { command: "garbageCollect" };
    }

    reset() {
        const stackSize = this.stackSize;
        const heapSize = this.heapSize;
        this.stackSize = 0;
        this.heapSize = 0;
        this.memoryLength = 0;
        this.stack = null;
        this.heap = null;
        this.stackPointer = null;
        this.heapPointer = null;
        this.typeMap = new Map();
        this.callArr = [];
        this.heapStatusArr = [];
        this.collectHeapMap = new Map();
        this.init(stackSize, heapSize);
        return { command: "reset" };
    }

    getViewData() {
        try {
            return this.stack
                .getMemoryToStringArr()
                .concat(this.heap.getMemoryToStringArr());
        } catch {
            return [];
        }
    }
}
