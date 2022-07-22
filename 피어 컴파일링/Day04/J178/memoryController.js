function transferAddress(pointer){
    return '0x' + pointer.toString(16).padStart(8, '0');
}

function transferToInteger(address){
    return parseInt(address, 16);
}

export class stack{
    constructor(){
        this.stackPointer = 0;
        this.stackPointerCounter = 0;

        this.dataStorage = new Map();
        this.pointerStorage = new Array ();
    }

    push(stackPointer, heapPointer){
        this.dataStorage.set(stackPointer, heapPointer);
    }
}
export class memory {
    constructor(){
        this.stack = new stack();
        this.stackSize = 100;
        this.heapSize = 100;
        this.dictType = new Map();
        this.heap = new Array();
        this.heapPointer = 0;
        this.heapCount = 0;
    }

    init(stackSize, heapSize){
        this.stackSize = stackSize;
        this.heapSize = heapSize;

        return '0x0000000' + this.stack.stackPointer.toString();
    }

    setSize(type, length){
        var arr_num = [1,2,4,8,16,32];
        var set_num = new Set(arr_num);
        if (set_num.has(length) && !this.dictType.has(type)){
            this.dictType.set(type, length);
        }
    }

    malloc(type, count){
        if(!this.dictType.has(type)){
            return null;
        }
        var data = this.dictType.get(type);
        if (data < 8){
            data = 8;
        }
        var totaldata = data * count;
        this.heap.push([type, totaldata, transferAddress(this.stack.stackPointer)]);
        this.stack.push(transferAddress(this.stack.stackPointer), this.heapPointer);
        this.stack.pointerStorage.push(transferAddress(this.stack.stackPointer));
        this.heapPointer += totaldata;
        this.heapCount += 1;
        var pointerStackCurrent = this.stack.stackPointer;
        this.stack.stackPointer += 4;

        return transferAddress(pointerStackCurrent);
    }

    free(pointer){
        if(!this.stack.dataStorage.has(pointer)){
            return null;
        }

        var key = this.stack.dataStorage.get(pointer);
        for(var i = 0; i < this.heap.length; i++){
            if (this.heap[i][2] == pointer){
                this.heap.splice(i, 1);
            }
        }
        return transferAddress(key);
    }

    call(name, paramCount){
        if (name.length > 8 && paramCount <= 0 && paramCount > 10){
            return null;
        }
        this.stack.push(transferAddress(this.stack.stackPointer), name);
        this.stack.pointerStorage.push(transferAddress(this.stack.stackPointer));

        this.stack.stackPointer += (paramCount + 1);

        return transferAddress(this.stack.stackPointer);
    }

    returnFrom(name){
        if (this.stack.pointerStorage.length == 0){
            return;
        }
        var count = -1, fact = false;
        for (var i = this.stack.pointerStorage.length - 1; i >= 0; i--){
            if (isNaN(this.stack.dataStorage.get(this.stack.pointerStorage[i]))){
                if (!fact && this.stack.dataStorage.get(this.stack.pointerStorage[i]) == name){
                    count = i;
                    break;
                }
                
                fact = true;
            }

        }
        if (!fact && count == -1){
            return;
        }

        if (fact){
            throw new Error("에러가 발생하였습니다.");
        }else{
            this.stack.stackPointer = transferToInteger(this.stack.pointerStorage[count]);
            for(var i = this.stack.pointerStorage.length - 1; i >= count; i--){
                this.stack.dataStorage.delete(this.stack.pointerStorage[i]);
                this.stack.pointerStorage.pop();
            }
        }
    }

    usage(){
        var heapSizeCurrent = 0;
        for(var i = 0; i < this.heap.length; i++){
            heapSizeCurrent += this.heap[i][1];
        }
        return [this.stackSize, this.stack.stackPointer, this.stackSize - this.stack.stackPointer, this.heapSize, heapSizeCurrent, this.heapSize - heapSizeCurrent];
    }

    callstack(){
        var funcString = '';

        for (var i = 0; i < this.stack.pointerStorage.length; i++){
            if (isNaN(this.stack.dataStorage.get(this.stack.pointerStorage[i]))){
                if (funcString === ''){
                    funcString += this.stack.dataStorage.get(this.stack.pointerStorage[i]) + '() ';
                    funcString += this.stack.pointerStorage[i] + ' ';
                }else{
                    funcString += '-> ';
                    funcString += this.stack.dataStorage.get(this.stack.pointerStorage[i]) + '() ';
                    funcString += this.stack.pointerStorage[i] + ' ';
                }
            }
        }
        return funcString;
    }

    heapdump(){
        var outputHeap = new Array();

        for (var i = 0; i < this.heap.length; i++){
            var str = 'type:';
            str += this.heap[i][0] + " size:";
            str += this.heap[i][1] + " stackAddress:";
            str += this.heap[i][2];
            outputHeap.push(str);
        }
        return outputHeap;
    }
    
    garbageCollect(){
        for(var i = this.heap.length - 1; i >= 0; i--){
            if (!this.stack.dataStorage.has(this.heap[i][2])){
                this.heap.splice(i,1);
            }
        }
    }

    reset(){
        this.stack.dataStorage.clear();
        this.stack.pointerStorage.splice(0);
        this.stack.stackPointer = 0;
        this.stack.stackPointerCounter = 0;
        this.dictType.clear();
        this.heap.splice(0);
        this.heapPointer = 0;
        this.heapCount = 0;
    }
}