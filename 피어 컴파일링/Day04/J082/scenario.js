import { Memory } from "./memory.js"

const memory = new Memory();

memory.init(50, 50)
memory.show();

const types = new Map([
    ["byte", 1],
    ["short", 2],
    ["int", 4],
    ["long", 8],
    ["float", 4],
    ["double", 8],
    ["char", 2],
    ["boolean", 1],
]);

types.forEach((length, type) => {
    memory.setSize(type, length);
});

console.log(memory);
memory.show();
memory.malloc("int", 4);
memory.show();
memory.free("0x0000");
memory.show();
memory.call("var", 10);
memory.show();
memory.returnFrom("var");
memory.show();
memory.usege();
memory.show();
memory.call("var", 6);
memory.show();
memory.callstack();
memory.show();
memory.heapdump();
memory.garbageCollect();
memory.show();
memory.reset();
console.log(memory)
memory.show()