import { Memory } from "./memory.js"

const memory = new Memory();

memory.init(100, 100)
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
memory.malloc("byte", 2);
// memory.show();
memory.malloc("short", 2);
// memory.show();
memory.malloc("int", 2);
// memory.show();
memory.malloc("long", 2);
// memory.show();
memory.malloc("float", 2);
// memory.show();
memory.malloc("double", 2);
// memory.show();
memory.malloc("char", 2);
// memory.show();
memory.malloc("boolean", 2);
// memory.show();
memory.free("0x0000");
memory.show();
memory.call("foo", 5);
memory.malloc("int", 4);
memory.malloc("int", 4);
memory.show();
memory.returnFrom("foo");
memory.show();
// memory.show();
// memory.usage();
// memory.call("foo", 5);
// memory.call("bar", 5);
// memory.show();
// memory.callstack();
// memory.show();
// memory.heapdump();
// memory.show();
// memory.garbageCollect();
// memory.show();
// memory.reset();
// console.log(memory)
// memory.show()