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
        return 0;
    }

    setSize(type, length) {
        console.log(
            "setSize--------------------------------------------------------------------"
        );
        if (this.typeMap.has(type)) {
            console.log("이미 등록된 타입입니다.");
        } else if (!length in [1, 2, 4, 8, 16, 32]) {
            console.log("지정할 수 없는 사이즈 입니다.");
        } else {
            this.typeMap.set(type, length);
        }
    }

    malloc(type, count) {
        console.log(
            "malloc--------------------------------------------------------------------"
        );
        let data = "#".repeat(this.typeMap.get(type));
        if (data.length < 8) data = data.padStart(8, " ");
        for (let i = 0; i < count; i++) {
            const stackPointerArr = [];
            const dataPartArr = data.match(/..../g);
            dataPartArr.forEach((dataPart) => {
                const collectHeapPointer = this.heap.add(dataPart);
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

        this.show();
    }

    free(pointer) {
        console.log(
            "free---------------------------------------------------------------------"
        );
        return this.heap.clear(this.stack.clear(pointer));
    }

    call(name, paramCount) {
        console.log(
            "call---------------------------------------------------------------------"
        );
        for (let i = 0; i < paramCount; i++) {
            this.stack.add(name);
        }
        this.callArr.unshift([name, paramCount]);
    }

    returnFrom(name) {
        console.log(
            "returnFrom----------------------------------------------------------------"
        );
        if (this.callArr[0][0] === name) {
            this.callArr.shift();
            this.stack.return(name);
        } else {
            console.log("최근에 호출된 name이 아닙니다.");
        }
    }

    usege() {
        console.log(
            "usege--------------------------------------------------------------------"
        );
        const stackMemory = this.stackSize;
        const usingStackMemory = this.stack.getLength();
        const remainStackMemory = stackMemory - usingStackMemory;
        const heapMemory = this.heapSize;
        const usingHeapMemory = this.heap.getLength();
        const remainHeapMemory = heapMemory - usingHeapMemory;

        console.log("-".repeat(50));
        console.log(
            `
    스택 영역 전체크기 : ${stackMemory},
            사용중인 용량 : ${usingStackMemory}, 
                남은 용량 : ${remainStackMemory},
    ---------------------------------------------------------------
        힙 영역 전체크기 : ${heapMemory}, 
            사용중인 용량 : ${remainHeapMemory},
                남은 용량 : ${remainHeapMemory}
`
        );

        console.log("-".repeat(50));
    }

    callstack() {
        console.log(
            "callstack------------------------------------------------------------------"
        );
        let nameIndex = this.stack.getLength() - 1;
        const calls = [];
        this.callArr.forEach((element) => {
            const [name, paramCount] = element;
            for (let i = 0; i < paramCount; i++) {
                if (i === 0) {
                    calls.push(
                        `[  ${name}() ${this.stack.getIndexName(nameIndex)}    `
                    );
                } else if (i === paramCount - 1) {
                    calls.push(
                        `   ${name}() ${this.stack.getIndexName(nameIndex)}   ]`
                    );
                } else {
                    calls.push(
                        `   ${name}() ${this.stack.getIndexName(nameIndex)} -> `
                    );
                }
                nameIndex--;
            }
        });
        console.log(calls.join(", "));
    }

    heapdump() {
        console.log(
            "heapdump------------------------------------------------------------------"
        );
        console.log("-".repeat(50));
        this.heapStatusArr.forEach((heapStatus) => {
            console.log(
                `
    타입: ${heapStatus.type}
    크기: ${heapStatus.length}
    해당 주소를 참조하는 스택 포인터 변수 정보
    : ${heapStatus.stackPointerArr.join(", ")}
    `
            );
        });
        console.log("-".repeat(50));
    }

    garbageCollect() {
        console.log(
            "garbageCollect------------------------------------------------------------"
        );
        this.heap.garbageCheck(this.collectHeapMap);
    }

    reset() {
        console.log(
            "reset---------------------------------------------------------------------"
        );
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
    }

    show() {
        console.log(
            this.stack
                .getMemoryToStringArr()
                .concat(this.heap.getMemoryToStringArr())
        );
    }
}
