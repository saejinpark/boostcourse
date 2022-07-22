const readline = require('readline');
const Memory = require('./memory.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  let memory;
  while(true) {
    let line = await new Promise((resolve) => {
      rl.question("\n명령어를 입력하세요 >> ", resolve);
    });
    const [command, ...values] = line.split(' ');

    if(command==='exit') break;

    // 입력 형태 : init ${stackSize} ${heapSize}
    else if(command==='init') {
      const [stackSize, heapSize] = values.map(Number);

      memory = new Memory(stackSize, heapSize);
      memory.init();
    }
    
    // 입력 형태 : setSize ${type} ${length}
    // --> 자바스크립트 타입으로 입력해야함 ex. number/string,...
    else if(command==='setSize') {
      const [type, length] = values;

      memory.setSize(type, length);
    }
    
    // 입력 형태 : malloc ${type} ${count}
    else if(command==='malloc') {
      const [type, count] = values;

      memory.malloc(type, count);
    }
    
    // 입력 형태 : free pointer 
    // --> pointer는 포인터 변수의 idx
    else if(command==='free') {
      const pointer = values[0];

      memory.free(pointer);
    }

    // 입력 형태 : call 
    // --> name과 paramCount는 입력 받지 않고 직접 적어주는 형식으로 구현했음
    // --> 만약 바꾸고 싶다면, paramCount 수만큼 foo안의 지역 변수를 추가/삭제 해야하고, 그에 따라 리턴값도 수정해야한다.
    else if(command==='call') {
      function foo() {
        let myAge = 24;
        let myName = 'minji';

        return [myAge, myName];
      }

      memory.call(foo(), 2, foo.name);
    }

    // 입력 형태 : returnFrom ${name}
    // --> name은 소괄호를 제외한 함수명만 적어주면 된다. 
    else if(command==='returnFrom') {
      const name = values[0];

      memory.returnFrom(name);
    }

    // 입력 형태 : usage
    else if(command==='usage') {
      memory.usage();
    }

    // 입력 형태 : reset
    else if(command==='reset') {
      memory.reset();
    }
  }
  process.exit();
}

main();