class Memory {
  constructor(stackSize=50, heapSize=50) {
    this.stack = new Array(stackSize);
    this.heap = new Array(heapSize);
    this.stackPointer = 0;
    this.heapPointer = 0;

    this.typeSize = new Map();
    this.savedStack = new Map();
    this.stackSize = stackSize;
    this.heapSize = heapSize;
    this.size = parseInt(stackSize)+parseInt(heapSize);
  }

  init() {
    console.log(`   > stack의 기본 주소 = 0x${this.stackPointer.toString(16).padStart(4, 0)}`);
    console.log(`   > heap의 기본 주소 = 0x${this.stackPointer.toString(16).padStart(4, 0)}`);
  }


  setSize(type, length) {
    if(![1, 2, 4, 8, 16, 32].includes(parseInt(length))) console.log('   !!유효한 사이즈가 아닙니다!!'); 
    else if(this.typeSize.has(type)) console.log(`   > 이미 등록한 타입입니다. \n   > ${type}타입의 사이즈 = ${this.typeSize.get(type)}`);
    else {
      this.typeSize.set(type, parseInt(length));
      console.log(`   > ${type}타입의 사이즈 = ${this.typeSize.get(type)}`);
    }
  }

  malloc(type, count) {
    if(this.typeSize.has(type)) {
      for(let i=0; i<this.stackPointer; i++) {
        const [t, c, v] = [this.stack[i]['type'], this.stack[i]['count'], this.stack[i]['variable']];
        if(t===type && c===parseInt(count)) {
          for(let j=0; j<v.length; j++) {
            this.heap[this.heapPointer] = v[j].padStart(8, '0');
            this.heapPointer++;
          }
          this.stack[i] = [this.heapPointer-count, count];
        }
      }
    }else console.log(`   > 등록되지 않은 타입입니다.`);
  }

  free(pointer) {
    const [freeAdrs, count] = this.stack[pointer].map(Number);

    let result = [];
    for(let i=freeAdrs; i<freeAdrs+count; i++) {
      result.push(i);
      this.heap[i] = 0;
    }

    console.log(`   > heap의 ${result.join(', ')} 메모리 해제`);
  }

  call(name, paramCount, fname) {
    if(name.length>8) console.log('   > name은 최대 8자까지 가능합니다.');
    else if(0>paramCount || paramCount>10) console.log('   > paramCount는 0부터 10이하까지 가능합니다.')
    else {
      this.stack[this.stackPointer] = [fname, paramCount];
      this.stackPointer++;

      const params = name;
      console.log(params);
      for(let i=0; i<paramCount; i++) {
        this.stack[this.stackPointer] = { 'type': typeof params[i], 'count': params[i].toString().length, 'variable': params[i].toString().split('') };
        this.stackPointer++;
      }
    }

    console.log(this.stack);
  }

  returnFrom(name) {
    for(let i=this.stackPointer-1; i>=0; i--) {
      const [n, c] = this.stack[i];
      if(typeof(n)==='string') {
        if(n===name) {
          for(let j=i+1; j<i+c+1; j++) {
            this.stack[j] = 0;
          }
        }else {
          throw new Error('   !!!최근에 호출한 name이 아닙니다!!!')
        }
      }
    }
    console.log(this.stack);
  }

  usage() {
    let result = [];
    let [stackCnt, heapCnt] = [0, 0];
    for(let s of this.stack) if(typeof s!=='undefined') stackCnt++;
    for(let h of this.heap) if(typeof h!=='undefined') heapCnt++;

    result.push(`   > (스택) 영역 전체 크기 = ${this.stackSize}`);
    result.push(`   > (스택) 사용중인 용량 = ${stackCnt}`);
    result.push(`   > (스택) 남은 용량 = ${this.stackSize-stackCnt}`);
    result.push(`   --------------------------------`);
    result.push(`   > (힙) 영역 전체 크기 = ${this.heapSize}`);
    result.push(`   > (힙) 사용중인 용량 = ${heapCnt}`);
    result.push(`   > (힙) 남은 용량 = ${this.heapSize-heapCnt}`);

    console.log(result.join('\n'));
  }

  reset() {
    this.stack = new Array(this.stackSize);
    this.heap = new Array(this.heapSize);
    this.stackPointer = 0;
    this.heapPointer = 0;
  }
}

module.exports = Memory;