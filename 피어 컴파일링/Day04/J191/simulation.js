var memory = require('./memory.js');

function main(){
    var Memory = new memory.Memory();

    Memory.init(100, 100);
    
    Memory.setSize("int", 4);
    Memory.setSize("double", 8);

    var stackPointer1 = Memory.malloc("int", 3);    
    console.log("Memory.malloc(\"int\", 3) 호출");
    var heapRes = Memory.heapdump();
    console.log(heapRes);

    console.log("\n");
    var stackPointer2 = Memory.malloc("double", 2);
    console.log("Memory.malloc(\"double\", 2) 호출");
    heapRes = Memory.heapdump();
    console.log(heapRes);

    console.log("\n");
    var usageRes = Memory.usage();
    console.log("usage = " + usageRes);

    console.log("\nMemory.malloc(\"double\", 2) 메모리 free");
    Memory.free(stackPointer2);
    heapRes = Memory.heapdump();
    console.log(heapRes);

    console.log("\n");
    Memory.call("foo", 0);
    console.log("Memory.call(\"foo\", 0) 호출");
    Memory.call("bar", 1);
    console.log("Memory.call(\"bar\", 1) 호출");
    Memory.call("dap", 2);
    console.log("Memory.call(\"dap\", 2) 호출");
    console.log(Memory.callstack());

    console.log("\n");
    var stackPointer2 = Memory.malloc("double", 2);
    console.log("Memory.malloc(\"double\", 2) 호출");
    heapRes = Memory.heapdump();
    console.log(heapRes);

    console.log("\nMemory.returnForm(\"dap\") 호출");
    Memory.returnForm("dap");
    console.log(Memory.callstack());

    console.log("\nMemory.garbageCollect() 호출");
    Memory.garbageCollect();
    heapRes = Memory.heapdump();
    console.log(heapRes);
}

main();