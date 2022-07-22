// 정수를 16진수로 변환하는 함수
const stackLoad = require("./stack.js");
const returnIntToHex = (num) => {
    return "0x" + num.toString(16).toUpperCase().padStart(4, "0");
};

class Memory {
    constructor() {
        this.lowAddr = 0;
        this.highAddr = 0;
        this.stackSize = 0;
        this.heapSize = 0;

        this.currStackPoint = 0;
        this.currHeapPoint = 0;
        this.typeSize = new Map();

        this.stack = []; // 일단 배열로 new stackLoad.Stack();
        this.heap = []; // 일단 배열로
    }

    init(stackSize, heapSize) {
        this.stackSize = stackSize;
        this.heapSize = heapSize;
        this.lowAddr = 0;
        this.highAddr = stackSize + heapSize;
        this.currStackPoint = stackSize + heapSize;
        return [returnIntToHex(this.lowAddr), returnIntToHex(this.highAddr)];
    }

    setSize(type, length) {
        if (this.typeSize.has(type)) return -1; // 이미 등록된 타입
        else if (![1, 2, 4, 8, 16, 32].includes(length)) return -2; // 잘못된 크기
        this.typeSize.set(type, length);
        return 1; // 성공적으로 등록됨
    }

    malloc(type, count) {
        if (!this.typeSize.has(type)) return -1; // 등록되지 않은 타입
        let allocateLength = this.typeSize.get(type) < 8 ? 8 * count : count * this.typeSize.get(type); // 할당할 메모리 사이즈
        if (allocateLength > this.heapSize - this.currHeapPoint || this.stackSize - (this.highAddr - this.currStackPoint) < 4) return -2; // 메모리 공간 부족
        else {
            let currPoint = this.currStackPoint;

            this.stack.push({ name: "malloc", type: "pointer", heapAddr: this.currHeapPoint, size: 4, addr: this.currStackPoint });
            this.heap.push({ name: "malloc", type: type, stackAddr: this.currStackPoint, size: allocateLength, addr: this.currHeapPoint });
            this.currHeapPoint += allocateLength;
            this.currStackPoint -= 4;
            return returnIntToHex(currPoint); // 스택 주소값 반환
        }
    }

    free(pointer) {
        let heapAddr;
        this.stack.forEach((el) => {
            if (el.addr == pointer) {
                el.type = "free";
                heapAddr = el.heapAddr;
            }
        });
        if (heapAddr.length == 0) return -1; // 없는 포인터
        for (var i = 0; i < this.heap.length; i++) {
            if (this.heap[i].address == heapAddr) {
                this.currHeapPoint -= this.heap[i].size;
                for (var j = i + 1; j < this.heap.length; j++) {
                    this.heap[j].addr -= this.heap[i].size;
                    for (var k = 0; k < this.stack.length; k++) {
                        if (this.stack[k].addr == this.heap[j].stackAddr) {
                            this.stack[k].heapAddr = this.heap[j].addr;
                            break;
                        }
                    }
                    this.heap[j].currHeapPoint -= this.heap[i].size;
                }
                this.heap.splice(i, 1);
                break;
            }
        }
        return heapAddr;
    }

    call(name, paramCount) {
        let allocateLength = 8 + 4 * (paramCount + 1);
        if (allocateLength > this.stackSize - (this.highAddr - this.currStackPoint)) return -1; // 메모리 공간 부족
        else {
            this.stack.push({ name: name, type: "call", size: allocateLength, heapAddr: -1, addr: this.currStackPoint });
            this.currStackPoint -= allocateLength;
        }
    }

    callStack() {
        let arr = [];
        this.stack.forEach((element) => {
            if (element.type == "call") {
                arr.push([element.name + "()", returnIntToHex(element.addr)]);
            }
        });
        return arr;
    }

    usage() {
        // 스택 영역 전체크기, 사용중인 용량, 남은 용량, 힙 영역 전체크기, 사용중인 용량, 남은 용량
        let useStack = this.highAddr - this.currStackPoint;
        let useHeap = this.currHeapPoint;
        return [this.stackSize, useStack, this.stackSize - useStack, this.heapSize, useHeap, this.heapSize - useHeap];
    }

    reset() {
        this.currStackPoint = this.stackSize + this.heapSize;
        this.currHeapPoint = 0;
        this.typeSize.clear();
        this.stack = [];
        this.heap = [];
        return this.usage(); // 초기화 한 후 사용량 반환
    }
}

module.exports = {
    Memory: Memory,
};
