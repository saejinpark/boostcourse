import { Memory } from "./memory.js";
import { ViewMemory } from "./viewMemory.js";

const memory = new Memory();

export class Scenario {
    constructor(memory) {
        this.memory = memory;
        this.viewMemory = new ViewMemory(this.memory);
    }
    one() {
        this.viewMemory.view();
        this.viewMemory.show(this.memory.init(100, 100));
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
            this.viewMemory.show(this.memory.setSize(type, length));
        });

        this.viewMemory.show(this.memory.malloc("byte", 2));
        this.viewMemory.show(this.memory.malloc("short", 2));
        this.viewMemory.show(this.memory.malloc("int", 2));
        this.viewMemory.show(this.memory.malloc("long", 2));
        this.viewMemory.show(this.memory.malloc("float", 2));
        this.viewMemory.show(this.memory.malloc("double", 2));
        this.viewMemory.show(this.memory.malloc("char", 2));
        this.viewMemory.show(this.memory.malloc("boolean", 2));
        this.viewMemory.show(this.memory.free("0x00000000"));
        this.viewMemory.show(this.memory.call("foo", 5));
        this.viewMemory.show(this.memory.malloc("int", 4));
        this.viewMemory.show(this.memory.malloc("int", 4));
        this.viewMemory.show(this.memory.returnFrom("foo"));
        this.viewMemory.show(this.memory.usage());
        this.viewMemory.show(this.memory.call("foo", 5));
        this.viewMemory.show(this.memory.call("bar", 5));
        this.viewMemory.show(this.memory.callstack());
        this.viewMemory.show(this.memory.heapdump());
        this.viewMemory.show(this.memory.garbageCollect());
        this.viewMemory.show(this.memory.reset());
    }
}
