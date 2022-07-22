
class Memory{
    constructor(){
        class Stack{
            constructor(){
                this.stackPointer = 0;
                this.space = [];
            }
        }
        this.baseAddress = 0xab000000000;
        this.stack = new Stack();
        this.stackSize = 0;
        this.heap = [];
        this.heapSize = 0;
        this.type = [];
    }

    init(stackSize, heapSize){
        this.stackSize = stackSize;
        this.heapSize = heapSize;

        return this.baseAddress;
    }

    setSize(type, length){
        if (this.type[type]) throw "setSize error : the type already exists";

        if (length == 1 || length == 2 || length == 4 || length == 8 || length == 16 || length == 32){
            this.type[type] = length;
        }
        else {
            throw "setSize error : wrong length";
        }
    }

    malloc(type, count){
        if (!this.type[type]) throw "malloc error : undefined type";
        
        var typeSize = this.type[type];
        if(typeSize < 8) typeSize = 8;

        this.heap.push({type:type, size:typeSize*count, stackPointer:this.stack.stackPointer});

        this.stack.space.push({heapAddr:this.heap.length-1});
        this.stack.stackPointer += 4;

        return this.stack.stackPointer - 4;
    }

    free(pointer){
        var stackIdx = pointer / 4;
        var heapAddr = this.stack.space[stackIdx]['heapAddr'];
        var size = this.heap[heapAddr]['size'];

        this.heapSize -= size;
        delete this.heap[heapAddr];

        return heapAddr;
    }

    call(name, paramCount){
        if (paramCount < 0 || paramCount > 10) throw "call error : wrong paramCount";
        if (name.length > 8) throw "call error : exceeded character count";

        this.stack.space.push({name:name, param:false});
        for(var i = 0; i < paramCount; i++) {
            this.stack.space.push({name:name, param:true});
        }
        this.stack.stackPointer += 4 * (paramCount + 1);
    }

    returnForm(name) {
        var stackIdx = this.stack.stackPointer / 4 - 1;

        for(var i = stackIdx; i >= 0; i--){
            if (this.stack.space[i]['name'] == undefined) continue;
            if (this.stack.space[i]['name'] != name) {
                throw "returnForm error : wrong name";
            }
            if (this.stack.space[i]['param'] == false) {
                this.stack.space.slice(i, stackIdx - i + 1);
                this.stack.stackPointer = i * 4;
                break;
            }
        }
    }

    usage(){
        var res = [];

        var curHeapSize = 0;
        for(var value of this.heap){
            curHeapSize += value['size'];
        }

        res.push(this.stackSize);
        res.push(this.stack.stackPointer);
        res.push(this.stackSize - this.stack.stackPointer);

        res.push(this.heapSize);
        res.push(curHeapSize);
        res.push(this.heapSize - curHeapSize);

        return res;
    }

    callstack(){
        var res = [];
        var stackIdx = this.stack.stackPointer / 4 - 1;

        for(var i = 0; i <= stackIdx; i++){
            if (this.stack.space[i]['name'] == "undefined") continue;

            if (this.stack.space[i]['param'] == false) {
                res.push([this.stack.space[i]['name'], i*4]);
            }
        }

        var str = ""; 
        if (res.length != 0){
            str = res[0][0] + "() " + res[0][1];
            for(var i = 1; i < res.length; i++){
                str += (" -> " + res[i][0] + "() " + res[i][1]);
            }
        }
        
        return str;
    }

    heapdump(){
        var res = [];
        for(var value of this.heap){
            if (value == undefined) continue;
            var str = "";
            str += ("type = " + value['type']);
            str += (", size = " + value['size']);
            str += (", stack pointer = " + value['stackPointer']);

            res.push(str);
        }
        return res;
    }

    garbageCollect(){
        for(var i = this.heap.length - 1; i >= 0; i--){
            if (this.heap[i] == undefined) continue;
            
            var heapStackPointer = this.heap[i]['stackPointer'];
            var heapStackIdx = heapStackPointer / 4;
            if (this.stack.stackPointer < heapStackPointer) {
                delete this.heap[i];
            }
            else {
                var stackHeapAddr = this.stack.space[heapStackIdx]['heapAddr'];
                if (stackHeapAddr == undefined || stackHeapAddr != i) {
                    delete this.heap[i];
                }
            } 
        }
    }

    reset(){
        this.stack.space = [];
        this.stack.stackPointer = 0;
        this.heap = [];
        this.type = [];
    }
}

module.exports = { Memory } ;