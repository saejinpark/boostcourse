class PriorityQueue {
  //be careful, using zero-based index
  arr;
  
  constructor(compare) {
    this.arr = [];
    //비교함수는 왼쪽의 인자가 위로 올라가는 조건이 와야 함
    //ex; (a, b) => a > b 라면 더 큰 a가 위로 올라갈 것
    this.compare = compare;
  }

  swap(index1, index2){
    let temp = this.arr[index1];
    this.arr[index1] = this.arr[index2];
    this.arr[index2] = temp;
  }

  empty() {
    return this.arr.length === 0;
  }

  size(){
    return this.arr.length;
  }

  push(element){
    
    this.arr.push(element);
    let index = this.arr.length - 1;
    
    while(index != 0 && this.compare(this.arr[index], this.arr[this.parent(index)])) {
      this.swap(index, this.parent(index))
      index = this.parent(index);
    }
  }

  top(){
    if (this.arr.length == 0)
      return null;
    return this.arr[0];
  }

  pop(){
    if (this.empty())
      return null;
    
    let returnvalue = this.arr[0];
    
    this.arr[0] = this.arr[this.arr.length-1];
    
    let index = 0;
    let swapindex = 0;
    let rightindex = 0;
    while((swapindex = this.left(index)) < this.arr.length) {
      if ((rightindex = this.right(index)) < this.arr.length && 
           this.compare(this.arr[rightindex], this.arr[swapindex]))
        swapindex = rightindex
      
        if (this.compare(this.arr[swapindex], this.arr[index]))
          this.swap(index, swapindex);
        else
          break;
        index = swapindex;
    }
    
    this.arr.pop();
    return returnvalue;
  }

  parent(index) {
    return Math.trunc((index-1)/2)
  }

  left(index) {
    return 2*index + 1;
  }

  right(index) {
    return 2*index + 2;
  }
}

export default PriorityQueue

// let a = new PriorityQueue((a, b) => a > b);
// for (let i=0; i<100; i++)
//   a.push(Math.trunc((Math.random()*10000)))
// while(!a.empty()) {
//   console.log(a.pop());
// }