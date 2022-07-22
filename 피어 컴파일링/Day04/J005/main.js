// 메모리
function main() {
    const memLoad = require("./memory.js");
    let mem = new memLoad.Memory();
    // 1. init
    console.log(">>>> init");
    console.log(mem.init(1024, 1024));

    // 2. setSize
    console.log(">>>> setSize");
    console.log(mem.setSize("int", 4)); // 성공적으로 등록됨
    console.log(mem.setSize("int")); // 이미 등록된 타입
    console.log(mem.setSize("char", 10)); // 잘못된 크기
    console.log(mem.setSize("boolean", 1)); // 성공적으로 등록됨
    console.log(mem.setSize("long", 8)); // 성공적으로 등록됨

    // 3. malloc
    console.log(">>>> malloc");
    console.log(mem.malloc("boolean", 4)); // 성공적으로 할당
    console.log(mem.malloc("int", 10)); // 성공적으로 할당
    console.log(mem.malloc("int", 10000)); // 메모리 공간 부족
    console.log(mem.malloc("wrong", 10)); // 등록되지 않은 타입

    // 4. usage
    console.log(">>>> usage");
    console.log(mem.usage()); // // 스택 [전체크기, 사용중인 용량, 남은 용량], 힙 [전체크기, 사용중인 용량, 남은 용량]

    // 5. reset
    console.log(">>>> reset");
    console.log(mem.reset()); // 초기화

    // 6. call
    console.log(">>>> call");
    mem.call("foo", 0);
    console.log(mem.usage());
    mem.call("bar", 1);
    mem.call("dap", 2);
    console.log(mem.usage());

    // 7. callStack
    console.log(">>>> callStack");
    console.log(mem.callStack());
}

main();
