import {memory, stack} from './memoryController.js';

var memo = new memory();
memo.init(100, 200);
memo.setSize("int", 8);
memo.setSize("boolean", 1);
memo.malloc("int", 4);
memo.malloc("boolean", 2);
memo.call("foo", 3);
memo.malloc("int", 1);
memo.call("boo", 4);
memo.malloc("int", 4);
try{
    memo.returnFrom("boo");
}catch(error){
    console.log(error);
}
console.log(memo.callstack());
console.log(memo.heapdump());
console.log(memo.heap);
memo.garbageCollect();
console.log(memo.heap);
memo.reset();
console.log(memo.stack.dataStorage);
console.log(memo.heap);
